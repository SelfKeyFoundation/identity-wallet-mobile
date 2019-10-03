import walletActions from './actions';

const delay = (time) => new Promise((res) => setTimeout(res, time));

const loadWalletOperation = () => async (dispatch, getState) => {
  dispatch(walletActions.setLoading(true));
  await delay(2000);
  dispatch(walletActions.setLoading(false));
};

export const operations = {
  loadWalletOperation,
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
