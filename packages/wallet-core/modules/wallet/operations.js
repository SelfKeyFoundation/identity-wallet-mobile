import walletActions from './actions';

const delay = (time) => new Promise((res) => setTimeout(res, time));

const loadWalletOperation = ({ wallet, vault }) => async (dispatch, getState) => {
  // dispatch(walletActions.setLoading(true));
  // dispatch(walletActions.setLoading(false));
};

export const operations = {
  loadWalletOperation,
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
