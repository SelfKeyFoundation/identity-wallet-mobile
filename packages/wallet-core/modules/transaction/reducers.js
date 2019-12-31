
import { createReducer } from '../../redux/reducers';
import types from './types';

export const initialState = {
  // address: '',
  address: '0x4ac0d9ebd28118cab68a64ad8eb8c07c0120ebf8',
  amount: 0.01,
  // Fiat amount will be selected from wallet
  transactionFee: 'normal',
  token: 'eth',
  transactionHash: '0xe66cb2767a9c1726a1b86d44c031254aa143af7a',
  errors: {
    address: undefined,
    transaction: undefined,
  },
  transactionFeeOptions: [
    // TODO: Compute this data
    // Will do it on Web3 Service integration
    {
      id: 'slow',
      name: 'Slow',
      ethAmount: 0.00047,
      fiatAmount: 0.1,
      time: '5-30 min',
    }, {
      id: 'normal',
      name: 'Normal',
      ethAmount: 0.0023,
      fiatAmount: 0.5,
      time: '2-5 min',
    }, {
      id: 'fast',
      name: 'Fast',
      ethAmount: 0.0047,
      fiatAmount: 1.00,
      time: '< 2 min',
    }
  ],
  // sending, success, in_progress
  status: 'error',
  sendEnabled: true,
  advancedMode: false,
	// amount: 0,
	// ethFee: 0,
	// usdFee: 0,
	// cryptoCurrency: ''
  
  // gasPrice: 0,
	// gasLimit: 0,
	// nouce: 0,
	// signedHex: '',
	// transactionHash: '',
	// addressError: false,
	// sending: false,
	// locked: false,
};

function setAddressReducer(state, action) {
  const { address } = action.payload;

  return {
    ...state,
    address,
  };
}

function setAmountReducer(state, action) {
  const { amount } = action.payload;

  return {
    ...state,
    amount,
  };
}

function setTransactionFeeOptionsReducer(state, action) {
  const { transactionFeeOptions } = action.payload;

  return {
    ...state,
    transactionFeeOptions,
  };
}

function setErrorsReducer(state, action) {
  const { errors } = action.payload;

  return {
    ...state,
    errors,
  };
}

function setStatusReducer(state, action) {
  const { status } = action.payload;

  return {
    ...state,
    status,
  };
}

function setSendEnabledReducer(state, action) {
  const { sendEnabled } = action.payload;

  return {
    ...state,
    sendEnabled,
  };
}

function setTransactionFeeReducer(state, action) {
  const { transactionFee } = action.payload;

  return {
    ...state,
    transactionFee,
  };
}

function setTokenReducer(state, action) {
  const { token } = action.payload;

  return {
    ...state,
    token,
  };
}

function setAdvancedModeReducer(state, action) {
  const { advancedMode } = action.payload;

  return {
    ...state,
    advancedMode,
  };
}

function updateTransactionReducer(state, action) {
  const { payload } = action;

  return {
    ...state,
    ...payload,
  };
}

export const transactionReducers = {
  setAddressReducer,
  setAmountReducer,
  setErrorsReducer,
  setTransactionFeeOptionsReducer,
  setSendEnabledReducer,
  setStatusReducer,
  setTokenReducer,
  setTransactionFeeReducer,
  setAdvancedModeReducer,
  updateTransactionReducer,
};

const reducersMap = {
  [types.SET_ADDRESS]: transactionReducers.setAddressReducer,
  [types.SET_AMOUNT]: transactionReducers.setAmountReducer,
  [types.SET_ERRORS]: transactionReducers.setErrorsReducer,
  [types.SET_SEND_ENABLED]: transactionReducers.setSendEnabledReducer,
  [types.SET_STATUS]: transactionReducers.setStatusReducer,
  [types.SET_TOKEN]: transactionReducers.setTokenReducer,
  [types.SET_TRANSACTION_FEE]: transactionReducers.setTransactionFeeReducer,
  [types.SET_TRANSACTION_FEE_OPTIONS]: transactionReducers.setTransactionFeeOptionsReducer,
  [types.SET_ADVANCED_MODE]: transactionReducers.setAdvancedModeReducer,
  [types.UPDATE_TRANSACTION]: transactionReducers.updateTransactionReducer,
};

export default createReducer(initialState, reducersMap);
