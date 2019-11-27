import walletActions from './actions';
import * as walletSelectors from './selectors';
import { WalletModel } from '../../models';
import { exitApp } from '../../system';

const loadWalletOperation = ({ wallet, vault }) => async (dispatch, getState) => {
  dispatch(walletActions.setWallet(wallet));
};

export const operations = {
  loadWalletOperation,
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
