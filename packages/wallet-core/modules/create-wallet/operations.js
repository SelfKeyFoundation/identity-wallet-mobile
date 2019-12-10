import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';
import actions from './actions';
import { walletOperations } from '../wallet/operations';

import * as selectors from './selectors';
// import { createVault } from '../../identity-vault';
import { navigate, Routes } from '../../navigation';
// import { WalletModel } from '../../models';
import { setupHDWallet } from './create-wallet-utils';

const submitPasswordOperation = (form) => async (dispatch, getState) => {
  dispatch(actions.setPassword(form.password));
  await navigate(Routes.CREATE_WALLET_CONFIRM_PASSWORD);
};

const submitPasswordConfirmationOperation = (form) => async (dispatch, getState) => {
  await dispatch(generateMnemonic());
  await navigate(Routes.CREATE_WALLET_BACKUP);
};

const submitWalletBackupOperation = (form) => async (dispatch, getState) => {
  // await dispatch(setupWalletOperation());
  const state = getState();
  const mnemonic = selectors.getMnemonicPhrase(state);
  // TODO: create selector
  const { password } = state.createWallet;

  const { wallet, vault } = await setupHDWallet({ mnemonic, password });
  await dispatch(walletOperations.loadWalletOperation({ wallet, vault }));

  await navigate(Routes.CREATE_WALLET_SETUP_COMPLETE);
};

const generateMnemonic = () => async (dispatch, getState) => {
  const mnemonic = WalletBuilder.generateMnemonic();
  dispatch(actions.setMnemonicPhrase(mnemonic));
};

export const operations = {
  submitPasswordOperation,
  submitPasswordConfirmationOperation,
  // setupWalletOperation,
  submitWalletBackupOperation,
};

export const createWalletOperations = {
  ...actions,
  ...operations,
};

export default createWalletOperations;
