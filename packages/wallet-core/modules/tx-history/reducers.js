
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


function updateTransactionReducer(state, action) {
  const { hash, updatedData } = action.payload;

  return {
    ...state,
    transactions: state.transactions.map(t => {
      if (t.hash === hash) {
        return {
          ...t,
          ...updatedData,
        }
      }

      return t;
    })
  };
}


export const txHistoryReducers = {
  setTransactionsReducer,
  addTransactionReducer,
  updateTransactionReducer,
};

const reducersMap = {
  [types.SET_TRANSACTIONS]: txHistoryReducers.setTransactionsReducer,
  [types.ADD_TRANSACTION]: txHistoryReducers.addTransactionReducer,
  [types.UPDATE_TRANSACTION]: txHistoryReducers.updateTransactionReducer,
};

export default createReducer(initialState, reducersMap);
