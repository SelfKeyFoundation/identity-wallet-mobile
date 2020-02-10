// @flow

export const getRoot = state => state.txHistory;
export const getTransactions = state => getRoot(state).transactions || [];
export const getTransactionsByToken = token => state => {
  const transactions = getTransactions(state);
  return transactions.filter(tx => tx.tokenSymbol === token);
};
export const getTransactionByHash = (hash = '') => state => {
  return getTransactions(state).find(tx => tx.hash.toLowerCase() === hash.toLowerCase());
};
