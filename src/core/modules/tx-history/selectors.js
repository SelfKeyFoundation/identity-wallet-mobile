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


// MOCKS

// import { NetworkStore } from "../app/NetworkStore";

// const transaction = {
//   hash: '123',
//   tokenSymbol: 'ETH',
//   from: '123',
//   to: '123',
//   status: 'sent',
// };

// const item = {
//   hash: transaction.hash,
//   networkId: NetworkStore.getNetwork().id,
//   tokenSymbol: transaction.tokenSymbol,
//   from: transaction.from,
//   to: transaction.address,
//   gasPrice: transaction.gasPrice,
//   gasLImit: transaction.gasLimit,
//   tokenDecimal: transaction.tokenDecimal,
//   value: parseFloat(transaction.amount),
//   nonce: transaction.nonce,
//   contractAddress: transaction.contractAddress,
//   // TODO: Figure out how to handle it
//   txReceiptStatus: 0,
//   isError: false,
//   timeStamp: Date.now(),
//   status: transaction.status,
// };

// export const getRoot = state => state.txHistory;
// export const getTransactions = state => {
//   return [item];
// };

// export const getLoading = state => getRoot(state).isLoading || false;
// export const getTransactionsByToken = token => state => {
//   return [item];
// };

// export const getTransactionByHash = (hash = '') => state => {
//   return item;
// };
