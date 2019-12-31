// @flow

export const getRoot = state => state.txHistory;
export const getTransactions = state => getRoot(state).transactions;
