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
};

export default appActions;
