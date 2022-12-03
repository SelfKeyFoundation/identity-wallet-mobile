import actions from './actions';
import { walletOperations } from '../wallet/operations';
import { unlockVault, unlockVaultWithMnemonic, unlockVaultWithBiometrics } from '../../identity-vault';
import { WalletModel } from '../../models';
import { navigate, Routes } from '../../navigation';
import { System } from '../../system';
import ducks from '../index';
import { getUserPreferences } from 'core/Storage';
import { walletConnectActions, walletConnectOperations } from 'screens/walletConnect/walletConnectSlice';

export const navigateToDashboardOperation = (form) => async (dispatch, getState) => {
  const preferences = await getUserPreferences();
  const flags = ducks.app.selectors.getKeyFiEnabled(getState());

  // debugger;
  // if (flags.keyfi && !preferences.skipKeyFiEligibility) {
  //   return navigate(Routes.KEYFI_ELIGIBILITY_START);
  // }

  dispatch(walletConnectActions.setUnlocked(true));
  dispatch(walletConnectOperations.init());

  return navigate(Routes.APP_DASHBOARD);
}

/**
 * Unlock the default wallet
 *
 * @param {*} form 
 */
const submitUnlockOperation = (form) => async (dispatch, getState) => {
  const wallet = WalletModel.getInstance().findOne();
  let vault;

  try {
    if (form.biometrics) {
      vault = await unlockVaultWithBiometrics(wallet.vaultId);
      System.getTracker().trackEvent({
        category: `unlockWallet/biometricUnlock`,
        action: 'success',
        level: 'machine'
      });
    } else {
      vault = await unlockVault(wallet.vaultId, form.password);
      System.getTracker().trackEvent({
        category: `unlockWallet/unlock`,
        action: 'success',
        level: 'machine'
      });
    }
    dispatch(actions.setErrors({}));
  } catch (err) {
    if (!form.biometrics) {
      dispatch(actions.setErrors({
        password: 'wrong_password',
      }));
    }

    return false;
  }

  await dispatch(walletOperations.loadWalletOperation({ wallet, vault }));
  await dispatch(navigateToDashboardOperation());

  return true;
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
const unlockWithAddressOperation = ({ address, password, biometrics }) => async (dispatch, getState) => {
  // Get the selected wallet, for now we are gonig to get the first one since the users can't create more than one
  const wallet = WalletModel.getInstance().findByAddress(address);
  let vault;

  try {
    if (biometrics) {
      vault = await unlockVaultWithBiometrics(wallet.vaultId);
      System.getTracker().trackEvent({
        category: `unlockWallet/biometricUnlock`,
        action: 'success',
        level: 'machine'
      });
    } else {  
      vault = await unlockVault(wallet.vaultId, password);
      System.getTracker().trackEvent({
        category: `unlockWallet/unlock`,
        action: 'success',
        level: 'machine'
      });
    }
  } catch (err) {
    if (biometrics) {
      return;
    }

    throw 'Password doesn\'t match'
  }

  await dispatch(walletOperations.loadWalletOperation({ wallet, vault }));
  await dispatch(navigateToDashboardOperation());
};

const unlockWithVaultIdOperation = (vaultId, password) => async (dispatch, getState) => {
  const wallet = await WalletModel.getInstance().findOne(item => item.vaultId === vaultId);
  await dispatch(unlockWithAddressOperation({
    address: wallet.address,
    password,
  }));
};

export const operations = {
  submitUnlockOperation,
  unlockWithAddressOperation,
  unlockWithVaultIdOperation,
  restoreAccessOperation,
  navigateToDashboardOperation,
};

export const unlockWalletOperations = {
  ...actions,
  ...operations,
};

export default unlockWalletOperations;
