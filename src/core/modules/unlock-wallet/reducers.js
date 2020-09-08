
import { createReducer } from '../../redux/reducers';
import unlockWalletTypes from './types';

export const initialState = {
  isLoading: false,
  errors: {
    password: undefined,
  },
};

function setErrors(state, action) {
  return {
    ...state,
    errors: action.payload.errors,
  };
}

function setLoading(state, action) {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  };
}

export const unlockWalletReducers = {
  setErrors,
  setLoading,
};

const reducersMap = {
  [unlockWalletTypes.SET_ERRORS]: unlockWalletReducers.setErrors,
  [unlockWalletTypes.SET_LOADING]: unlockWalletReducers.setLoading,
};

export default createReducer(initialState, reducersMap);
