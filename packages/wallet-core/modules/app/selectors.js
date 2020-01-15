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
