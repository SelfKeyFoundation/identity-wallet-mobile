import appTypes from './types';

export const appActions = {
  setLoading: (isLoading) => ({
    type: appTypes.SET_APP_LOADING,
    payload: { isLoading },
  }),
  setGuideSettings: (settings) => ({
    type: appTypes.SET_GUIDE_SETTINGS,
    payload: { settings },
  }),
  showSendTokensModal: (show) => ({
    type: appTypes.SHOW_SEND_TOKENS_MODAL,
    payload: { show },
  }),
  showReceiveTokensModal: (show) => ({
    type: appTypes.SHOW_RECEIVE_TOKENS_MODAL,
    payload: { show },
  }),
  setSupportedBiometryType: (value) => ({
    type: appTypes.SET_SUPPORTED_BIOMETRY_TYPE,
    payload: { value },
  }),
  setSnackMessage: (message) => ({
    type: appTypes.SET_SNACK_MESSAGE,
    payload: { message },
  }),
  setFeatureFlags: (flags) => ({
    type: appTypes.SET_FEATURE_FLAGS,
    payload: flags,
  }),
  setNetwork: (networkId) => ({
    type: appTypes.SET_NETWORK,
    payload: networkId,
  })
};

export default appActions;
