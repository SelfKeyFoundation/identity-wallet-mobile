// @flow
import * as WalletTypes from './types';
import { LoadWalletAction } from './actions';
import { createReducer } from '../../redux/reducers';
import { initialState, WalletState } from './state';


export function loadWalletReducer(state: WalletState, action: LoadWalletAction): WalletState {
  return {
    ...state,
    isLoading: true,
  };
}

export const reducers = {
  [WalletTypes.LOAD_WALLET]: loadWalletReducer,
};

export default createReducer(initialState, reducers);
