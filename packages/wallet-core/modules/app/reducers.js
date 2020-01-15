
import { createReducer } from '../../redux/reducers';
import appTypes from './types';

export const initialState = {
  isLoading: true,
  guideSettings: undefined,
  showSendTokensModal: false,
  showReceiveTokensModal: false,
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

export const appReducers = {
  setAppLoadingReducer,
  setGuideSettingsReducer,
  showSendTokensModalReducer,
  showReceiveTokensModalReducer
};

const reducersMap = {
  [appTypes.SET_APP_LOADING]: appReducers.setAppLoadingReducer,
  [appTypes.SET_GUIDE_SETTINGS]: appReducers.setGuideSettingsReducer,
  [appTypes.SHOW_SEND_TOKENS_MODAL]: appReducers.showSendTokensModalReducer,
  [appTypes.SHOW_RECEIVE_TOKENS_MODAL]: appReducers.showReceiveTokensModalReducer,
};

export default createReducer(initialState, reducersMap);
