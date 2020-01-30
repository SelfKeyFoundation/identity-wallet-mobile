
import { createReducer } from '../../redux/reducers';
import walletTypes from './types';

export const initialState = {
  isLoading: true,
  balance: 0,
};

function setWalletLoadingReducer(state, action) {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  };
}

function setWalletReducer(state, action) {
  const wallet = action.payload;

  if (wallet.tokens) {
    wallet.tokens = Array.from(wallet.tokens);
  }

  return {
    ...state,
    ...wallet,
  };
}

function setNewPasswordReducer(state, action) {
  return {
    ...state,
    newPassword: action.payload.password,
  };
}

function setVaultReducer(state, action) {
  return {
    ...state,
    vault: action.payload.vault,
  };
}

export const walletReducers = {
  setWalletLoadingReducer,
  setWalletReducer,
  setNewPasswordReducer,
  setVaultReducer,
};

const reducersMap = {
  [walletTypes.SET_WALLET_LOADING]: walletReducers.setWalletLoadingReducer,
  [walletTypes.SET_WALLET]: walletReducers.setWalletReducer,
  [walletTypes.SET_NEW_PASSWORD]: walletReducers.setNewPasswordReducer,
  [walletTypes.SET_VAULT]: walletReducers.setVaultReducer,
};

export default createReducer(initialState, reducersMap);
