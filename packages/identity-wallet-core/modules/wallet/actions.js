// @flow
import { LOAD_WALLET } from './types';

export type LoadWalletAction = {
  type: LOAD_WALLET,
};

export function loadWallet(): LoadWalletAction {
  return {
    type: LOAD_WALLET,
  };
}
