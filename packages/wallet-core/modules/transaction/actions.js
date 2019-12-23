import types from './types';

export const transactionActions = {
  setAddress: (address) => ({
    type: types.SET_ADDRESS,
    payload: { address },
  }),
  setAmount: (amount) => ({
    type: types.SET_AMOUNT,
    payload: { amount },
  }),
  setErrors: (errors) => ({
    type: types.SET_ERRORS,
    payload: { errors },
  }),
  setTransactionFeeOptions: (transactionFeeOptions) => ({
    type: types.SET_TRANSACTION_FEE_OPTIONS,
    payload: { transactionFeeOptions },
  }),
  setStatus: (status) => ({
    type: types.SET_STATUS,
    payload: { status },
  }),
  setSendEnabled: (sendEnabled) => ({
    type: types.SET_SEND_ENABLED,
    payload: { sendEnabled },
  }),
  setTransactionFee: (transactionFee) => ({
    type: types.SET_TRANSACTION_FEE,
    payload: { transactionFee },
  }),
  setToken: (token) => ({
    type: types.SET_TOKEN,
    payload: { token },
  }),
  setAdvancedMode: (advancedMode) => ({
    type: types.SET_ADVANCED_MODE,
    payload: { advancedMode },
  }),
};

export default transactionActions;
