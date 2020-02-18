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

function getSymbol(symbol) {
  if (symbol === 'KI') {
    return 'KEY';
  }

  return symbol;
}

async function loadWalletBalance(wallet) {
  wallet.balance = await getBalanceByAddress(wallet.address);
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

async function loadWalletTokens(wallet) {
  // Fetch tokens balance
  wallet.tokens = await Promise.all(
    wallet.tokens
      .filter(token => !token.hidden)
      .map(async (walletToken) => {
        const token = await TokenModel.getInstance().findById(walletToken.tokenId || walletToken.id);
        let balance = 0;

        try {
          balance = await getTokenBalance(token.address, wallet.address);

          if (balance === 'NaN') {
            balance = 0;
          }
        } catch(err) {
          console.error(err);
        }

        const price = getTokenPrice(token.symbol);

        return {
          id: token.id,
          fiatCurrency: 'usd',
          symbol: getSymbol(token.symbol),
          decimal: token.decimal,
          address: token.address,
          balanceInFiat: parseFloat(balance) * price.priceUSD,
          balance,
        };
      })
  );

  wallet.tokens = wallet.tokens.map(computeColor);
}

/**
 * Refresh wallet balance and tokens balance
 */
const refreshWalletOperation = () => async (dispatch, getState) => {
  const wallet = getState().wallet;

  dispatch(ducks.txHistory.operations.loadTxHistoryOperation())

  try {
    await Promise.all([
      loadWalletBalance(wallet),
      loadWalletTokens(wallet),
    ]);
  } catch(err) {
    console.error(err);
  }

  dispatch(walletActions.setWallet(wallet));
};

// const encryptedData = encryptData('testing', '1234');
// console.log(encryptedData);
// const decryptedData = decryptData(encryptedData, '1234');
// console.log(decryptedData);

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

  await dispatch(walletActions.setWallet(wallet));

  // TODO: Store balance in the database
  // When db balance is available can display it and fetch the real balance in background
  // It will make the loading process faster
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
      symbol: token.symbol,
      createdAt: new Date,
      updatedAt: new Date,
    });
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
  const token = await getTokenInfo(contractAddress);

  if (!token || !token.symbol) {
    throw {
      code: 'address_not_found',
    };
  }

  return token;
};

const hideTokenOperation = ({ contractAddress }) => async (dispatch, getState) => {
  const state = getState();
  const token = TokenModel.getInstance().findByAddress(contractAddress);
  const walletToken = await WalletTokenModel.getInstance().findOne('tokenId = $0', token.id);

  WalletTokenModel.getInstance().updateById(walletToken.id, {
    hidden: true
  });

  const wallet = getState().wallet;
  wallet.tokens = wallet.tokens.filter(token => token.address !== contractAddress);
  dispatch(walletActions.setWallet(wallet));
};

export const operations = {
  loadWalletOperation,
  refreshWalletOperation,
  backupWalletOperation,
  submitNewPasswordOperation,
  confirmNewPasswordOperation,
  addTokenOperation,
  hideTokenOperation,
  validateTokenOperation,
  getRecoveryInformationOperation,
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
