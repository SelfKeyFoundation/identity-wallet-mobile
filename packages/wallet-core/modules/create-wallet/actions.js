import types from './types';

export const walletActions = {
  setPassword: (password) => ({
    type: types.SET_PASSWORD,
    payload: {
      password,
    },
  }),
  setMnemonicPhrase: (mnemonicPhrase) => ({
    type: types.SET_MNEMONIC_PHRASE,
    payload: {
      mnemonicPhrase,
    },
  }),
  setConfirmationMnemonic: (mnemonic) => ({
    type: types.SET_CONFIRMATION_MNEMONIC,
    payload: {
      mnemonic,
    },
  }),
  addConfirmationWord: (wordIndex) => ({
    type: types.ADD_CONFIRMATION_WORD,
    payload: {
      wordIndex,
    },
  }),
  setShuffledMnemonic: (mnemonic) => ({
    type: types.SET_SHUFFLED_MNEMONIC,
    payload: {
      mnemonic,
    },
  }),
  clearConfirmation: (mnemonicPhrase) => ({
    type: types.CLEAR_CONFIRMATION,
    payload: {},
  }),
  setConfirmationError: (error) => ({
    type: types.SET_CONFIRMATION_ERROR,
    payload: {
      error
    },
  }),
};

export default walletActions;
