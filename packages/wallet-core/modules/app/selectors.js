// @flow
export const getRoot = state => state.app;
export const getGuideSettings = state => getRoot(state).guideSettings;
export const isTermsAccepeted = (state) => {
  const settings = getGuideSettings(state);
  return settings && settings.termsAccepted;
};
