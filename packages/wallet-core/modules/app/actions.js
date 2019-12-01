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
};

export default appActions;
