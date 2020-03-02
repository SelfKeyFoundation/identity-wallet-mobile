import walletActions from './actions';
import * as selectors from './selectors';
import { WalletModel, TokenModel, WalletTokenModel } from '../../models';
import { exitApp, System } from '../../system';
import { getBalanceByAddress, getTokenBalance } from './wallet-util';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import { getTokenInfo } from '../../services/token-service';
import { unlockWalletWithPrivateKey } from '../../services/wallet-service';
import ducks from '../index';
import { encryptData, decryptData, generateBackup } from '../../identity-vault/backup';
import { unlockVault, updatePassword } from '../../identity-vault';
import { navigate, Routes } from '../../navigation';
import { getConfigs } from '@selfkey/configs';

function getSymbol(symbol) {
  if (symbol === 'KI') {
    return 'KEY';
  }

  return symbol;
}

function getTokenName(symbol = 'eth') {
  symbol = symbol && symbol.toUpperCase();

  if (symbol === 'ETH') {
    return 'Ethereum';
  }

  if (symbol === 'KI' || symbol === 'KEY') {
    return 'SelfKey';
  }

  return symbol;
}

async function loadWalletBalance(wallet) {
  const balance = await getBalanceByAddress(wallet.address);

  wallet.balance = balance;

  // persist information in the db
  await WalletModel.getInstance().updateByAddress(wallet.address, {
    balance,
  });
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
  // Fetch tokens balance
  wallet.tokens = await Promise.all(
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
              balance,
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
  // Mock data for tokens, used for testing purposes
  // wallet.tokens = new Array(15).fill(0).map((_, index) => {
  //   return {
  //     parsed: true,
  //     id: index + 1,
  //     walletTokenId: `${index}`,
  //     hidden: false,
  //     fiatCurrency: 'usd',
  //     name: `Test Token ${index}`,
  //     symbol: `TST${index}`,
  //     decimal: 10,
  //     address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  //     balanceInFiat: 1000,
  //     balance: 10,
  //   };
  // });
  wallet.tokens = wallet.tokens.map(computeColor).filter(token => {
    return !token.hidden
  })
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

  try {
    await Promise.all([
      loadWalletBalance(wallet),
      loadWalletTokens(wallet, true),
    ]);
  } catch(err) {
    console.error(err);
  }

  dispatch(walletActions.setWallet(wallet));
};

const refreshBalanceOperation =  () => async (dispatch, getState) => {
  const wallet = getState().wallet;

  try {
    await Promise.all([
      loadWalletBalance(wallet),
      loadWalletTokens(wallet, true),
    ]);
  } catch(err) {
    console.error(err);
  }

  dispatch(walletActions.setWallet(wallet));
};

const backupWalletOperation = (password) => async (dispatch, getState) => {
  const { vaultId, path } = getState().wallet;
  const vaultBackup = await generateBackup(vaultId, password);

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

  // TODO: Remove backup file from filesystem
};

const changePasswordOperation = (password) => async (dispatch, getState) => {
  const { vaultId } = getState().wallet;
  const vault = await unlockVault(vaultId, password);
  await dispatch(ducks.wallet.actions.setVault(vault));
  navigate(Routes.WALLET_NEW_PASSWORD);
};

const getRecoveryInformationOperation = (password) => async (dispatch, getState) => {
  const { vaultId } = getState().wallet;
  const vault = await unlockVault(vaultId, password);
  return vault.mnemonic;
};

/**
 * 
 * Load wallet
 */
const loadWalletOperation = ({ wallet, vault }) => async (dispatch, getState) => {
  const { privateKey } = vault.getETHWalletKeys(0);
  unlockWalletWithPrivateKey(privateKey)

  await loadWalletTokens(wallet);
  await dispatch(walletActions.setWallet(wallet));

  dispatch(refreshWalletOperation());
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

  navigate(Routes.APP_DASHBOARD);
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

  await walletModel.updateByAddress(dbWallet.address, {
    tokens: [
      ...dbWallet.tokens,
      newToken,
    ],
  });

  await loadWalletTokens(wallet);
  dispatch(walletActions.setWallet(wallet));
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

  wallet.tokens = wallet.tokens.map(token => {
    if (token.address === contractAddress) {
      return {
        ...token,
        hidden: true,
      };
    }

    return token;
  }).filter(token => !token.hidden);
 
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
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
