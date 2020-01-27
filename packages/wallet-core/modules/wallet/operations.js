import walletActions from './actions';
import * as selectors from './selectors';
import { WalletModel, TokenModel } from '../../models';
import { exitApp, System } from '../../system';
import { getBalanceByAddress, getTokenBalance } from './wallet-util';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
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

async function loadWalletTokens(wallet) {
  // Fetch tokens balance
  wallet.tokens = await Promise.all(wallet.tokens.map(async (walletToken) => {
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
      symbol: getSymbol(token.symbol),
      decimal: token.decimal,
      address: token.address,
      balanceInFiat: price.priceUSD,
      balance,
    }
  }));
}

/**
 * Refresh wallet balance and tokens balance
 */
const refreshWalletOperation = () => async (dispatch, getState) => {
  const wallet = getState().wallet;

  try {
    await Promise.all([
      loadWalletBalance(wallet),
      loadWalletTokens(wallet),
      dispatch(ducks.txHistory.operations.loadTxHistoryOperation())
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
    .then((res) => {
      return System.shareFile({
        filePath: filePath,
        mimeType: 'application/zip',
        fileName: 'wallet-backup'
      })
    })
    .catch((err) => {
      console.log(err);
    });
  
  // TODO: Remove backup file from filesystem
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
  await dispatch(refreshWalletOperation());
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

export const operations = {
  loadWalletOperation,
  refreshWalletOperation,
  backupWalletOperation,
  submitNewPasswordOperation,
  confirmNewPasswordOperation
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
