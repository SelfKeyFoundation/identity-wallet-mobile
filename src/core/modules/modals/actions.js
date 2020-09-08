import appTypes from './types';

export const appActions = {
  showModal: (id, params) => ({
    type: appTypes.SHOW_MODAL,
    payload: { id, params },
  }),
  hideModal: () => ({
    type: appTypes.HIDE_MODAL,
    payload: {},
  }),
};

export default appActions;
