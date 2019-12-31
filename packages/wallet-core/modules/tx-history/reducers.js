
import { createReducer } from '../../redux/reducers';
import types from './types';

export const initialState = {
  transactions: [],
};


function setTransactionsReducer(state, action) {
  const { transactions } = action.payload;

  return {
    ...state,
    transactions,
  };
}

function addTransactionReducer(state, action) {
  const { newTransaction } = action.payload;

  return {
    ...state,
    transactions: [
      newTransaction,
      ...state.transactions,
    ]
  };
}


export const txHistoryReducers = {
  setTransactionsReducer,
  addTransactionReducer,
};

const reducersMap = {
  [types.SET_TRANSACTIONS]: txHistoryReducers.setTransactionsReducer,
  [types.ADD_TRANSACTION]: txHistoryReducers.addTransactionReducer,

};

export default createReducer(initialState, reducersMap);
