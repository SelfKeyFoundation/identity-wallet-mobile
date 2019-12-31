import types from './types';

export const txHistoryActions = {
  setTransactions: (transactions) => ({
    type: types.SET_ADDRESS,
    payload: { transactions },
  }),
  addTransaction: (newTransaction) => ({
    type: types.ADD_TRANSACTION,
    payload: { newTransaction }
  })
};

export default txHistoryActions;
