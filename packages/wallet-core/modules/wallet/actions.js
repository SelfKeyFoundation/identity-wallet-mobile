import walletTypes from './types';

export const walletActions = {
  setLoading: (isLoading) => ({
    type: walletTypes.SET_WALLET_LOADING,
    payload: { isLoading },
  }),

  setWallet: (wallet) => ({
    type: walletTypes.SET_WALLET,
    payload: wallet,
  }),
};

export default walletActions;
