import { createReducer } from '../../redux/reducers';
import { NetworkMapping } from './NetworkStore';
import appTypes from './types';

export const initialState = {
	isLoading: true,
	guideSettings: undefined,
	showSendTokensModal: false,
	showReceiveTokensModal: false,
	biometricsMethod: null,
	network: NetworkMapping[1],
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

function setFeatureFlagsReducer(state, action) {
	return {
		...state,
		featureFlags: action.payload,
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
		snackMessage: action.payload.message,
	};
}

function setNetworkReducer(state, action) {
	return {
		...state,
		network: NetworkMapping[action.payload],
	};
}

export const appReducers = {
	setAppLoadingReducer,
	setGuideSettingsReducer,
	showSendTokensModalReducer,
	showReceiveTokensModalReducer,
	setSupportedBiometryTypeReducer,
	setSnackMessageReducer,
	setFeatureFlagsReducer,
  setNetworkReducer,
};

const reducersMap = {
	[appTypes.SET_APP_LOADING]: appReducers.setAppLoadingReducer,
	[appTypes.SET_GUIDE_SETTINGS]: appReducers.setGuideSettingsReducer,
	[appTypes.SHOW_SEND_TOKENS_MODAL]: appReducers.showSendTokensModalReducer,
	[appTypes.SHOW_RECEIVE_TOKENS_MODAL]: appReducers.showReceiveTokensModalReducer,
	[appTypes.SET_SUPPORTED_BIOMETRY_TYPE]: appReducers.setSupportedBiometryTypeReducer,
	[appTypes.SET_SNACK_MESSAGE]: appReducers.setSnackMessageReducer,
	[appTypes.SET_FEATURE_FLAGS]: appReducers.setFeatureFlagsReducer,
	[appTypes.SET_NETWORK]: appReducers.setNetworkReducer,
};

export default createReducer(initialState, reducersMap);
