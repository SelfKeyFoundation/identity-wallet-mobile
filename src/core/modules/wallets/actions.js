import walletsTypes from './types';

export const walletsActions = {
  setWallets: (wallets) => ({
    type: walletsTypes.SET_WALLETS,
    payload: { wallets },
  }),

  addWallet: (wallet) => ({
    type: walletsTypes.ADD_WALLET,
    payload: { wallet },
  }),
};

export default walletsActions;
