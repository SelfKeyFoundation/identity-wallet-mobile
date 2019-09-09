// @flow
import {
  LOAD_WALLET,
} from './types';

// action types
export type LoadWalletAction = {
  type: LOAD_WALLET,
};

// actions
export function loadWallet(): LoadWalletAction {
  return {
    type: LOAD_WALLET,
  };
}
