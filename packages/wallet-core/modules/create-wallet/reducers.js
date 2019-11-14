
import { createReducer } from '../../redux/reducers';
import types from './types';

export const initialState = {
  password: undefined,
};

function setPasswordReducer(state, action) {
  return {
    ...state,
    password: action.payload.password,
  };
}

export const createWalletReducers = {
  setPasswordReducer,
};

const reducersMap = {
  [types.SET_PASSWORD]: setPasswordReducer,
};

export default createReducer(initialState, reducersMap);
