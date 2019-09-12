import walletActions from './actions';

const loadWalletOperation = () => (dispatch, getState) => {
  dispatch(walletActions.setLoading(true));
  dispatch(walletActions.setWallet({
    name: 'SelfKey Wallet A',
  }));
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
