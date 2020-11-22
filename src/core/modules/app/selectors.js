// @flow
export const getRoot = state => state.app;
export const getGuideSettings = state => getRoot(state).guideSettings;
export const isTermsAccepeted = (state) => {
  const settings = getGuideSettings(state);
  return settings && settings.termsAccepted;
};

export const showSendTokensModal = (state) => {
  return getRoot(state).showSendTokensModal;
};

export const showReceiveTokensModal = (state) => {
  return getRoot(state).showReceiveTokensModal;
};

export const getSupportedBiometryType = (state) => {
  return getRoot(state).supportedBiometryType;
};

export const getSnackMessage = state => getRoot(state).snackMessage;
export const getFeatureFlags = state => getRoot(state).featureFlags || {};
export const getKeyFiEnabled = state => getFeatureFlags(state).keyfi;
