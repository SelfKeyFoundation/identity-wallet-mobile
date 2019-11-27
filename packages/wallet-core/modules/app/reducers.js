
import { createReducer } from '../../redux/reducers';
import appTypes from './types';

export const initialState = {
  isLoading: true,
  guideSettings: undefined,
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

export const appReducers = {
  setAppLoadingReducer,
  setGuideSettingsReducer,
};

const reducersMap = {
  [appTypes.SET_APP_LOADING]: appReducers.setAppLoadingReducer,
  [appTypes.SET_GUIDE_SETTINGS]: appReducers.setGuideSettingsReducer,

};

export default createReducer(initialState, reducersMap);
