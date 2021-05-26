// @flow

import { NetworkStore } from "../app/NetworkStore";

export const getRoot = state => state.txHistory;
export const getTransactions = state => (getRoot(state).transactions || []).filter((item) => item.networkId === NetworkStore.getNetwork().id);
export const getLoading = state => getRoot(state).isLoading || false;
export const getTransactionsByToken = token => state => {
  const transactions = getTransactions(state);
  return transactions.filter(tx => tx.tokenSymbol === token);
};
export const getTransactionByHash = (hash = '') => state => {
  return getTransactions(state).find(tx => tx.hash.toLowerCase() === hash.toLowerCase());
};
