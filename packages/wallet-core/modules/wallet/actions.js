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

  setNewPassword: (password) => ({
    type: walletTypes.SET_NEW_PASSWORD,
    payload: { password },
  }),

  setVault: (vault) => ({
    type: walletTypes.SET_VAULT,
    payload: { vault },
  }),
};

export default walletActions;
