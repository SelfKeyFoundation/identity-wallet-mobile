
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

function setMnemonicPhrase(state, action) {
  return {
    ...state,
    mnemonicPhrase: action.payload.mnemonicPhrase,
  };
}

export const createWalletReducers = {
  setPasswordReducer,
  setMnemonicPhrase,
};

const reducersMap = {
  [types.SET_PASSWORD]: setPasswordReducer,
  [types.SET_MNEMONIC_PHRASE]: setMnemonicPhrase,
};

export default createReducer(initialState, reducersMap);
