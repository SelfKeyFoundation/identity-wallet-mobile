import actions from './actions';
import { walletOperations } from '../wallet/operations';
import { unlockVault } from '../../identity-vault';
import { WalletModel } from '../../models';
import { navigate, Routes } from '../../navigation';

const submitUnlockOperation = (form) => async (dispatch, getState) => {
  // Get the selected wallet, for now we are gonig to get the first one since the users can't create more than one
  const wallet = WalletModel.getInstance().findOne();
  let vault;

  try {
    vault = await unlockVault(wallet.vaultId, form.password);
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

export const operations = {
  submitUnlockOperation,
};

export const unlockWalletOperations = {
  ...actions,
  ...operations,
};

export default unlockWalletOperations;
