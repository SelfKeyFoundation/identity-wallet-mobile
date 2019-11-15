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
};

export default walletActions;
