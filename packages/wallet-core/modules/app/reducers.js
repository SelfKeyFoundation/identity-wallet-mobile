
import { createReducer } from '../../redux/reducers';
import appTypes from './types';

export const initialState = {
  isLoading: true,
};

function setAppLoadingReducer(state, action) {
  return {
    ...state,
    isLoading: action.payload.isLoading,
  };
}

export const appReducers = {
  setAppLoadingReducer,
};

const reducersMap = {
  [appTypes.SET_APP_LOADING]: appReducers.setAppLoadingReducer,
};

export default createReducer(initialState, reducersMap);
