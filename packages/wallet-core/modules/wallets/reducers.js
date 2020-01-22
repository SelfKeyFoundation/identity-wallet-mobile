
import { createReducer } from '../../redux/reducers';
import walletsTypes from './types';

export const initialState = {
  wallets: []
};

function setWalletsReducer(state, action) {
  return {
    ...state,
    wallets: action.payload.wallets,
  };
}

function addWalletReducer(state, action) {
  const { wallet } = action.payload;

  return {
    ...state,
    wallets: [
      ...state.wallets,
      wallet,
    ],
  };
}

export const walletsReducers = {
  setWalletsReducer,
  addWalletReducer,
};

const reducersMap = {
  [walletsTypes.SET_WALLETS]: walletsReducers.setWalletsReducer,
  [walletsTypes.ADD_WALLETS]: walletsReducers.addWalletReducer,
};

export default createReducer(initialState, reducersMap);
