
import { createReducer } from '../../redux/reducers';
import types from './types';

export const initialState = {
  password: undefined,
};

function setPasswordReducer(state, action) {
  return {
    ...state,
    password: action.payload.password,
  };
}

function setMnemonicPhraseReducer(state, action) {
  return {
    ...state,
    mnemonicPhrase: action.payload.mnemonicPhrase,
  };
}

function setConfirmationMnemonicReducer(state, action) {
  return {
    ...state,
    mnemonicConfirmation: action.payload.mnemonic,
  };
}

function addConfirmationWordReducer(state, action) {
  // const word = state.shuffledMnemonic.split(' ')[;

  return {
    ...state,
    mnemonicConfirmation: [
      ...(state.mnemonicConfirmation || []),
      action.payload.wordIndex
    ],
  };
}

function clearConfirmationReducer(state) {
  const { mnemonicConfirmation } = state;

  return {
    ...state,
    mnemonicConfirmation: mnemonicConfirmation.slice(0, mnemonicConfirmation.length - 1),
    confirmationError: undefined,
  };
}

function setShuffledMnemonicReducer(state, action) {
  return {
    ...state,
    shuffledMnemonic: action.payload.mnemonic,
  };
}

function setConfirmationErrorReducer(state, action) {
  return {
    ...state,
    confirmationError: action.payload.error,
  };
}

export const createWalletReducers = {
  setPasswordReducer,
  setMnemonicPhraseReducer,
  addConfirmationWordReducer,
  clearConfirmationReducer,
  setConfirmationMnemonicReducer,
  setShuffledMnemonicReducer,
  setConfirmationErrorReducer,
};

const reducersMap = {
  [types.SET_PASSWORD]: setPasswordReducer,
  [types.SET_MNEMONIC_PHRASE]: setMnemonicPhraseReducer,
  [types.ADD_CONFIRMATION_WORD]: addConfirmationWordReducer,
  [types.CLEAR_CONFIRMATION]: clearConfirmationReducer,
  [types.SET_CONFIRMATION_MNEMONIC]: setConfirmationMnemonicReducer,
  [types.SET_SHUFFLED_MNEMONIC]: setShuffledMnemonicReducer,
  [types.SET_CONFIRMATION_ERROR]: setConfirmationErrorReducer,
};

export default createReducer(initialState, reducersMap);
