
import { createReducer } from '../../redux/reducers';
import contractTypes from './types';
import { normalize, schema } from 'normalizr';
import { validateAllowanceAmount, validateContractAddress } from './utils';
import _ from 'lodash';

export const initialState = {
  contracts: [],
	contractsById: [],
	allowances: [],
	allowancesById: {},
	editor: {}
};

function setAppLoadingReducer(state, action) {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  };
}

function setGuideSettingsReducer(state, action) {
  return {
    ...state,
    guideSettings: action.payload.settings,
  };
}

function showSendTokensModalReducer(state, action) {
  return {
    ...state,
    showSendTokensModal: action.payload.show,
  };
}

function showReceiveTokensModalReducer(state, action) {
  return {
    ...state,
    showReceiveTokensModal: action.payload.show,
  };
}

function setSupportedBiometryTypeReducer(state, action) {
  return {
    ...state,
    supportedBiometryType: action.payload.value,
  };
}

function setSnackMessageReducer(state, action) {
  return {
    ...state,
    snackMessage: action.payload.message
  }
}

export const contractReducers = {
  setContractsReducer: (state, action) => {
    const normalized = normalize(action.payload, [contractSchema]);

    return {
      ...state,
      contracts: normalized.result || [],
      contractsById: normalized.entities.contracts || {}
    };
  },
  setAllowancesReducer: (state, action) => {
    const normalized = normalize(action.payload, [allowanceSchema]);

    return {
      ...state,
      allowances: normalized.result || [],
      allowancesById: normalized.entities.allowances || {}
    };
  },
  setOneAllowanceReducer: (state, action) => {
    if (!state.allowancesById[action.payload.id]) {
      state = { ...state, allowances: [...state.allowances, action.payload.id] };
    }
    state = {
      ...state,
      allowancesById: { ...state.allowancesById, [action.payload.id]: action.payload }
    };
    return state;
  },
  setAllowanceEditorReducer: (state, action) => {
    state = { ...state, editor: {} };
    return contractReducers.updateAllowanceEditorReducer(state, action);
  },
  updateAllowanceEditorReducer: (state, action) => {
    const { payload } = action;
    let editor = state.editor;
    let errors = editor.errors;

    if (payload.contractAddress) {
      let contractError;
      if (!validateContractAddress(payload.contractAddress)) {
        contractError = 'Invalid Contract Address';
      }
      errors = { ...errors, contractError };
      editor = { ...editor, contractAddress: payload.contractAddress };
    }
    const options = _.pick(payload, [
      'requestedAmount',
      'currentAmount',
      'contractName',
      'tokenAddress',
      'tokenDecimals',
      'tokenSymbol',
      'fixed',
      'loading',
      'checkingAmount',
      'checkingGasPrice',
      'gas',
      'gasPrice',
      'nonce',
      'nextPath',
      'cancelPath'
    ]);

    editor = { ...editor, ...options };

    if (payload.amount === '') {
      editor = { ...editor, amount: payload.amount };
    }

    if (payload.amount && editor.tokenDecimals) {
      let amountError;
      if (!validateAllowanceAmount(payload.amount, editor.tokenDecimals)) {
        amountError = 'Invalid Allowance Amount';
      }
      errors = { ...errors, amountError };
      editor = { ...editor, amount: payload.amount };
    }
    return { ...state, editor: { ...editor, errors: { ...errors } } };
  }
};

const reducersMap = {
  [contractTypes.CONTRACTS_SET]: contractReducers.setContractsReducer,
  [contractTypes.CONTRACTS_ALLOWANCES_SET]: contractReducers.setAllowancesReducer,
  [contractTypes.CONTRACT_ALLOWANCE_EDITOR_SET]: contractReducers.setAllowanceEditorReducer,
  [contractTypes.CONTRACT_ALLOWANCE_EDITOR_UPDATE]: contractReducers.updateAllowanceEditorReducer,
  [contractTypes.CONTRACTS_ALLOWANCES_SET_ONE]: contractReducers.setOneAllowanceReducer,
};

export default createReducer(initialState, reducersMap);
