// @flow
export const getRoot = state => state.wallet;
export const getWallet = (state) => getRoot(state).wallet || {};
export const getAddress = (state) => getWallet(state).address;
export const isTermsAccepeted = (state) => getWallet(state).termsAccepted;
