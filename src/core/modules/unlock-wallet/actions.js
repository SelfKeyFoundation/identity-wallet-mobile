import unlockWalletTypes from './types';

export const unlockWalletActions = {
  // unlockWallet: ({ password }) => ({
  //   type: unlockWalletTypes.UNLOCK_WALLET,
  //   payload: { password },
  // }),

  setErrors: (errors) => ({
    type: unlockWalletTypes.SET_ERRORS,
    payload: { errors },
  }),

  setLoading: (isLoading) => ({
    type: unlockWalletTypes.SET_LOADING,
    payload: { isLoading },
  }),

  // Forgot password
  // Select wallet
};

export default unlockWalletActions;
