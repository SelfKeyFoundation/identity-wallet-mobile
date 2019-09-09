// @flow
import * as WalletTypes from './types';

// action types
export type LoadWalletAction = {
  type: WalletTypes.LOAD_WALLET,
};

// actions
export function loadWallet(): LoadWalletAction {
  return {
    type: WalletTypes.LOAD_WALLET,
  };
}
