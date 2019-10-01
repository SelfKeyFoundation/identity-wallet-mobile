// @flow
import appTypes from './types';

export const appActions = {
  setLoading: (isLoading) => ({
    type: appTypes.SET_APP_LOADING,
    payload: { isLoading },
  }),
};

export default appActions;
