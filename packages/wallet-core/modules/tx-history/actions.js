import types from './types';

export const txHistoryActions = {
  setTransactions: (transactions) => ({
    type: types.SET_TRANSACTIONS,
    payload: { transactions },
  }),
  addTransaction: (newTransaction) => ({
    type: types.ADD_TRANSACTION,
    payload: { newTransaction }
  }),
  updateTransaction: (hash, updatedData) => ({
    type: types.UPDATE_TRANSACTION,
    payload: { hash, updatedData },
  }),
  setLoding: (isLoading) => ({
    type: types.SET_LOADING,
    payload: { isLoading },
  })
};

export default txHistoryActions;
