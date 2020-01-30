import actions from './actions';
import { walletOperations } from '../wallet/operations';
import { unlockVault, unlockVaultWithMnemonic } from '../../identity-vault';
import { WalletModel } from '../../models';
import { navigate, Routes } from '../../navigation';
import ducks from '../index';
/**
 * Unlock the default wallet
 *
 * @param {*} form 
 */
const submitUnlockOperation = (form) => async (dispatch, getState) => {
  // Get the selected wallet, for now we are gonig to get the first one since the users can't create more than one
  const wallet = WalletModel.getInstance().findOne();
  let vault;

  try {
    vault = await unlockVault(wallet.vaultId, form.password);
    dispatch(actions.setErrors({}));
  } catch (err) {
    dispatch(actions.setErrors({
      password: 'wrong_password',
    }));

    return;
  }

  await dispatch(walletOperations.loadWalletOperation({ wallet, vault }));
  // Redirect to dashboard
  await navigate(Routes.APP_DASHBOARD);
};

const restoreAccessOperation = (mnemonic, walletAddress) => async (dispatch, getState) => {
  const model = WalletModel.getInstance();
  const wallet = walletAddress ? model.findByAddress(walletAddress): model.findOne();
  const vault = await unlockVaultWithMnemonic(wallet.vaultId, mnemonic);

  await dispatch(ducks.wallet.actions.setVault(vault));
  await dispatch(walletOperations.loadWalletOperation({ wallet, vault }));

  navigate(Routes.WALLET_NEW_PASSWORD);
};


/**
 * Unlock the default wallet
 *
 * @param {*} form 
 */
const unlockWithAddressOperation = (address, password) => async (dispatch, getState) => {
  // Get the selected wallet, for now we are gonig to get the first one since the users can't create more than one
  const wallet = WalletModel.getInstance().findByAddress(address);
  let vault;

  try {
    vault = await unlockVault(wallet.vaultId, password);
  } catch (err) {
    throw 'Password doesn\'t match'
  }

  await dispatch(walletOperations.loadWalletOperation({ wallet, vault }));

  await navigate(Routes.APP_DASHBOARD);
};

const unlockWithVaultIdOperation = (vaultId, password) => async (dispatch, getState) => {
  const wallet = await WalletModel.getInstance().findOne('vaultId = $0', vaultId);
  await dispatch(unlockWithAddressOperation(wallet.address, password));
};

export const operations = {
  submitUnlockOperation,
  unlockWithAddressOperation,
  unlockWithVaultIdOperation,
  restoreAccessOperation,
};

export const unlockWalletOperations = {
  ...actions,
  ...operations,
};

export default unlockWalletOperations;
