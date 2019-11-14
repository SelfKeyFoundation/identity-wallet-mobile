import types from './types';

export const walletActions = {
  setPassword: (password) => ({
    type: types.SET_PASSWORD,
    payload: {
      password,
    },
  }),
};

export default walletActions;
