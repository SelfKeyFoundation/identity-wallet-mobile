import walletActions from './actions';
import * as selectors from './selectors';
import { WalletModel, TokenModel, WalletTokenModel } from '../../models';
import { exitApp, System } from '../../system';
import { getBalanceByAddress, getTokenBalance } from './wallet-util';
import { getTokenPrice } from 'blockchain/services/price-service';
import { getTokenInfo } from '../../services/token-service';
import { unlockWalletWithPrivateKey } from '../../services/wallet-service';
import ducks from '../index';
import { encryptData, decryptData, generateBackup } from '../../identity-vault/backup';
import { unlockVault, updatePassword, unlockVaultWithBiometrics } from '../../identity-vault';
import { navigate, Routes } from '../../navigation';
import { getConfigs } from 'configs';
import { addTop20Tokens } from '../create-wallet/create-wallet-utils';
import { navigateToDashboardOperation } from '../unlock-wallet/operations';
import { NetworkStore } from '../app/NetworkStore';

function getSymbol(symbol) {
  if (symbol === 'KI') {
    return 'KEY';
  }

  return symbol;
}

function getTokenName(symbol = NetworkStore.getNetwork().symbol) {
  symbol = symbol && symbol.toUpperCase();

  if (symbol === NetworkStore.getNetwork().symbol) {
    return NetworkStore.getNetwork().tokenName;
  }

  if (symbol === 'KI' || symbol === 'KEY') {
    return 'SelfKey';
  }

  return symbol;
}

async function loadWalletBalance(wallet) {
  const updatedData = {};
  const balance = await getBalanceByAddress(wallet.address);

  updatedData.balance = balance;

  // persist information in the db
  await WalletModel.getInstance().updateByAddress(wallet.address, {
    balance,
  });

  return updatedData;
}

const colors = [
  '#93B0C1',
  '#ADC8D8',
  '#00C0D9',
  '#475768',
  '#697C95',
  '#2DA1F8',
  '#FE4B61',
  '#50E3C2',
  '#2798BC',
  '#9418DC',
  '#0C556C',
];

const computeColor = token => token.color ? token : ({
  ...token,
  color: colors[`${token.symbol}`.charCodeAt(0) % colors.length]
});

function getPrimaryToken() {
  const primaryToken = getConfigs().primaryToken;
  const token = TokenModel.getInstance().findBySymbol(primaryToken);

  return token;
}

async function loadWalletTokens(wallet, checkBalance) {

  return {};
  const updatedData = {};
  // Fetch tokens balance
  updatedData.tokens = await Promise.all(
    wallet.tokens
      .map(async (tk, idx) => {
        const walletTokenId = tk.parsed ? tk.walletTokenId : tk.id;
        const walletToken = await WalletTokenModel.getInstance().findById(walletTokenId);

        if (idx === 0) {
          const primaryToken = getPrimaryToken();
          walletToken.tokenId = primaryToken.id;
        }

        const token = await TokenModel.getInstance().findById(walletToken.tokenId);
        let balance = walletToken.balance || 0;

        if (checkBalance) {
          try {
            balance = await getTokenBalance(token.address, wallet.address);
            await WalletTokenModel.getInstance().updateById(walletToken.id, {
              balance: balance.toString(),
            });
          } catch(err) {
            console.error(err);
          }
        }

        if (balance === 'NaN') {
          balance = 0;
        }

        const price = getTokenPrice(token.symbol);

        return {
          parsed: true,
          id: token.id,
          walletTokenId: walletToken.id,
          hidden: walletToken.hidden,
          fiatCurrency: 'usd',
          name: token.name || getTokenName(token.symbol),
          symbol: getSymbol(token.symbol),
          decimal: token.decimal,
          address: token.address,
          balanceInFiat: parseFloat(balance) * price.priceUSD,
          balance,
        };
      })
  );

  updatedData.tokens = updatedData.tokens.map(computeColor).filter(token => {
    return !token.hidden
  });

  return updatedData;
}

/**
 * Refresh wallet balance and tokens balance
 */
const refreshWalletOperation = (asyncHistory) => async (dispatch, getState) => {
  const wallet = getState().wallet;

  try {
    if (asyncHistory) {
      await dispatch(ducks.txHistory.operations.loadTxHistoryOperation(true));
    } else {
      dispatch(ducks.txHistory.operations.loadTxHistoryOperation());
    }
  } catch(err) {
    console.error(err);
  }

  const updateState = (updatedWallet) => {
    dispatch(walletActions.setWallet(updatedWallet));
  };

  try {
    await Promise.all([
      loadWalletBalance(wallet).then(updateState),
      loadWalletTokens(wallet, true).then(updateState),
    ]);
  } catch(err) {
    console.error(err);
  }
};

const refreshBalanceOperation =  () => async (dispatch, getState) => {
  const wallet = getState().wallet;
  const updateState = (updatedWallet) => {
    dispatch(walletActions.setWallet(updatedWallet));
  };

  try {
    await Promise.all([
      loadWalletBalance(wallet).then(updateState),
      loadWalletTokens(wallet, true).then(updateState),
    ]);
  } catch(err) {
    console.error(err);
  }
};

const backupWalletOperation = ({ password, biometrics }) => async (dispatch, getState) => {
  const { vaultId, path } = getState().wallet;
  const vaultBackup = await generateBackup(vaultId, password, biometrics);

  vaultBackup.wallets.push({
    path,
  });

  const encryptedBackup = encryptData(JSON.stringify(vaultBackup), password);
  const fs = System.getFileSystem();
  const filePath = `${fs.DocumentDirectoryPath}/wallet-backup.zip`;

  await fs.writeFile(filePath, JSON.stringify(encryptedBackup), 'utf8')
    .then(async (res) => {
      await System.shareFile({
        filePath: `file://${filePath}`,
        mimeType: 'application/zip',
        fileName: 'wallet-backup'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const changePasswordOperation = (password) => async (dispatch, getState) => {
  const { vaultId } = getState().wallet;
  const vault = await unlockVault(vaultId, password);
  await dispatch(ducks.wallet.actions.setVault(vault));
  navigate(Routes.WALLET_NEW_PASSWORD);
};

const getRecoveryInformationOperation = ({ password, biometrics }) => async (dispatch, getState) => {
  const { vaultId } = getState().wallet;
  let vault;

  if (biometrics === true) {
    vault = await unlockVaultWithBiometrics(vaultId);
  } else {
    vault = await unlockVault(vaultId, password);
  }

  return vault.mnemonic;
};

async function updateWalletLastUnlock(wallet) {
  const model = WalletModel.getInstance();

  const lastUnlockDate = new Date();

  await model.updateByAddress(wallet.address, {
    lastUnlockDate: lastUnlockDate,
  });

  return {
    lastUnlockDate,
  };
}

/**
 * 
 * Load wallet
 */
const loadWalletOperation = ({ wallet, vault }) => async (dispatch, getState) => {
  let { privateKey} = vault;
  if (!privateKey) {
    privateKey = vault.getETHWalletKeys(0).privateKey;
  }

  const updateState = (updatedWallet) => {
    dispatch(walletActions.setWallet(updatedWallet));
    wallet = {
      ...wallet,
      ...updatedWallet,
    }
  };

  async function loadIt() {
    await updateWalletLastUnlock(wallet).then(updateState);
    await addTop20Tokens(wallet).then(updateState);
    await loadWalletTokens(wallet).then(updateState);
    dispatch(refreshWalletOperation());
    await dispatch(ducks.identity.operations.loadIdentitiesOperation(wallet.address));
    await dispatch(ducks.identity.operations.unlockIdentityOperation());
  }

  setTimeout(() => {
    unlockWalletWithPrivateKey(privateKey);
    dispatch(ducks.createWallet.operations.setMnemonicPhrase(null));
    dispatch(ducks.createWallet.operations.setPassword(null));
    dispatch(ducks.createWallet.operations.setConfirmationMnemonic([]));
    setTimeout(() => {
      loadIt();
    }, 1000);
  }, 500);

  dispatch(walletActions.setWallet(wallet));

  await loadWalletTokens(wallet, false).then(updateState);
};

/**
 * 
 * Load wallet
 */
const submitNewPasswordOperation = ({ password }) => async (dispatch, getState) => {
  await dispatch(walletActions.setNewPassword(password));
  navigate(Routes.WALLET_CONFIRM_NEW_PASSWORD);
};

/**
 * 
 * Load wallet
 */
const confirmNewPasswordOperation = ({ password }) => async (dispatch, getState) => {
  const state = getState();
  const newPassword = selectors.getNewPassword(state);

  if (newPassword !== password) {
    throw {
      message: 'does_not_match',
    };
  }

  const vault = selectors.getVault(state);

  await updatePassword(vault.id, null, newPassword, {
    currentPasswordHash: vault.password
  });

  await dispatch(walletActions.setNewPassword(''));

  System.getTracker().trackEvent({
    category: `confirmNewPassword/changePassword`,
    action: 'success',
    level: 'app'
  });

  // navigate(Routes.APP_DASHBOARD);
  await dispatch(navigateToDashboardOperation());
};

const addTokenOperation = ({ contractAddress }) => async (dispatch, getState) => {
  const state = getState();
  const token = await dispatch(validateTokenOperation({ contractAddress }))
  const { wallet } = getState();

  const tokenModel = TokenModel.getInstance();
  let dbToken = await tokenModel.findByAddress(contractAddress);

  if (!dbToken) {
    dbToken = await tokenModel.create({
      id: tokenModel.generateId(),
      decimal: token.decimal,
      address: contractAddress,
      isCustom: true,
      name: token.name,
      symbol: token.symbol,
      createdAt: new Date,
      updatedAt: new Date,
    });
  } else {
    dbToken.name = token.name;
    await tokenModel.updateById(dbToken.id, dbToken);
  }

  const newToken = {
    id: WalletTokenModel.getInstance().generateId(),
    balance: '0',
    balanceInFiat: 0,
    hidden: false,
    tokenId: dbToken.id
  }

  wallet.tokens.push(newToken);

  const walletModel = WalletModel.getInstance();
  const dbWallet = await walletModel.findByAddress(wallet.address);
  const dbTokens = dbWallet.tokens;

  await walletModel.updateByAddress(dbWallet.address, {
    tokens: [
      ...dbTokens,
      newToken,
    ],
  });

  const updatedData = await loadWalletTokens(wallet);

  dispatch(walletActions.setWallet({
    ...wallet,
    ...updatedData
  }));
};

const validateTokenOperation = ({ contractAddress }) => async (dispatch, getState) => {
  const state = getState();
  const { wallet } = state;

  let token;

  try {
    token = await getTokenInfo(contractAddress);
  } catch(err) {
    token = null;
  }

  if (!token || !token.symbol) {
    throw {
      code: 'address_not_found',
    };
  }

  let dbToken = await TokenModel.getInstance().findByAddress(contractAddress);

  if (dbToken && wallet.tokens.find(t => t.id === dbToken.id)) {
    throw {
      code: 'already_used',
    }; 
  }

  return token;
};

const hideTokenOperation = ({ contractAddress }) => async (dispatch, getState) => {
  const state = getState();
  const token = TokenModel.getInstance().findByAddress(contractAddress);
  const walletTokens = await WalletTokenModel.getInstance().find('tokenId = $0', token.id);

  await Promise.all(walletTokens.map(walletToken => {
    return WalletTokenModel.getInstance().updateById(walletToken.id, {
      hidden: true
    });
  }));

  const wallet = getState().wallet;

  wallet.tokens = wallet.tokens.map(item => {
    if (item && item.address === contractAddress) {
      return {
        ...item,
        hidden: true,
      };
    }

    return item;
  }).filter(item => !item.hidden);
 
  dispatch(walletActions.setWallet(wallet));
};

const removeWalletOperation = () => async (dispatch, getState) => {
  const wallet = getState().wallet;

  await Promise.all(wallet.tokens.map((token) => {
    return WalletTokenModel.getInstance().removeById(token.walletTokenId);
  }));

  await WalletModel.getInstance().removeById(wallet.address);

  const wallets = await WalletModel.getInstance().findAll();

  if (!wallets.length) {
    navigate(Routes.CREATE_WALLET_FLOW);
  } else {
    navigate(Routes.UNLOCK_WALLET_PASSWORD);
  }

  await dispatch(walletActions.setWallet({
    tokens: [],
    address: undefined,
  }));
};

const setBiometricsEnabledOperation = (enabled) => async (dispatch, getState) => {
  const { wallet } = getState();
  await dispatch(walletActions.setWallet({
    ...wallet,
    biometricsEnabled: enabled,
  }));

  await WalletModel.getInstance().updateByAddress(wallet.address, {
    biometricsEnabled: enabled,
  });

  System.getTracker().trackEvent({
    category: `wallet/setBiometricsEnabled`,
    action: enabled,
    level: 'app'
  });
}

export const operations = {
  loadWalletOperation,
  refreshWalletOperation,
  refreshBalanceOperation,
  changePasswordOperation,
  backupWalletOperation,
  submitNewPasswordOperation,
  confirmNewPasswordOperation,
  addTokenOperation,
  hideTokenOperation,
  validateTokenOperation,
  getRecoveryInformationOperation,
  removeWalletOperation,
  setBiometricsEnabledOperation
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
