
import { createReducer } from '../../redux/reducers';
import walletTypes from './types';

export const initialState = {
  isLoading: false,
  wallet: null,
};

function setWalletLoadingReducer(state, action) {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  };
}

function setWalletReducer(state, action) {
  return {
    ...state,
    wallet: action.payload,
  };
}

export const walletReducers = {
  setWalletLoadingReducer,
  setWalletReducer,
};

const reducersMap = {
  [walletTypes.SET_WALLET_LOADING]: walletReducers.setWalletLoadingReducer,
  [walletTypes.SET_WALLET]: walletReducers.setWalletReducer,
};

export default createReducer(initialState, reducersMap);
