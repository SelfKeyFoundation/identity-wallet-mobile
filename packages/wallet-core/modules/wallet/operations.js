import walletActions from './actions';
import * as walletSelectors from './selectors';
import { WalletModel } from '../../models';

const loadWalletOperation = ({ wallet, vault }) => async (dispatch, getState) => {
  dispatch(walletActions.setWallet(wallet));
};

const acceptTermsOperation = () => async (dispatch, getState) => {
  const state = getState();
  const wallet = walletSelectors.getWallet(state);

  console.log('#mzm terms accepeted');

  wallet.termsAccepted = true;

  // await WalletModel.getInstance().updateByAddress(wallet.address, wallet);
  dispatch(walletActions.setWallet(wallet));
};

const rejectTermsOperation = () => async (dispatch, getState) => {
  // Close the application
  console.log('close app');
};

export const operations = {
  loadWalletOperation,
  acceptTermsOperation,
  rejectTermsOperation,
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
