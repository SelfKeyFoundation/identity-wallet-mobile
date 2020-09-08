// @flow

export const getRoot = state => state.wallets;
export const getWallets = state => getRoot(state).wallets;

