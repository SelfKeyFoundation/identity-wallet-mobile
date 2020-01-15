import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';
import actions from './actions';
import { walletOperations } from '../wallet/operations';
import * as selectors from './selectors';
import { navigate, Routes } from '../../navigation';
import { setupHDWallet } from './create-wallet-utils';

function shuffleArray(array) {
  let i = array.length;
  if (i == 0) return array;
  while (--i) {
      const j = Math.floor(Math.random() * (i + 1 ));
      const a = array[i];
      const b = array[j];
      array[i] = b;
      array[j] = a;
  }
  return array;
}

const submitPasswordOperation = (form) => async (dispatch, getState) => {
  dispatch(actions.setPassword(form.password));
  await navigate(Routes.CREATE_WALLET_CONFIRM_PASSWORD);
};

const submitPasswordConfirmationOperation = (form) => async (dispatch, getState) => {
  await dispatch(generateMnemonic());
  await navigate(Routes.CREATE_WALLET_BACKUP);
};

const submitWalletBackupOperation = (form) => async (dispatch, getState) => {
  const state = getState();
  const mnemonic = selectors.getMnemonicPhrase(state);

  await navigate(Routes.CREATE_WALLET_CONFIRM_MNEMONIC);
};

const submitConfirmationOperation = (form) => async (dispatch, getState) => {
  const state = getState();
  const mnemonic = selectors.getMnemonicPhrase(state);
  const confirmationMenmonic = selectors.getMnemonicConfirmation(state);

  if (mnemonic !== confirmationMenmonic) {
    await dispatch(actions.setConfirmationError('Current order doesn’t match your Recovery Phrase. Please try again.'))
    return;
  }

  const { password } = state.createWallet;
  const { wallet, vault } = await setupHDWallet({ mnemonic, password });

  await dispatch(walletOperations.loadWalletOperation({ wallet, vault }));
  await navigate(Routes.CREATE_WALLET_SETUP_COMPLETE);
};

const generateMnemonic = () => async (dispatch, getState) => {
  const mnemonic = WalletBuilder.generateMnemonic();
  const shuffledMnemonic = shuffleArray(mnemonic.split(' ')).join(' ');
  await dispatch(actions.setMnemonicPhrase(mnemonic));
  await dispatch(actions.setShuffledMnemonic(shuffledMnemonic));
};

export const operations = {
  submitPasswordOperation,
  submitPasswordConfirmationOperation,
  submitWalletBackupOperation,
  submitConfirmationOperation,
};

export const createWalletOperations = {
  ...actions,
  ...operations,
};

export default createWalletOperations;
