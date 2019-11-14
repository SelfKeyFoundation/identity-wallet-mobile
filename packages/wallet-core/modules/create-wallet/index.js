import reducer, { createWalletReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';

export default {
  reducer,
  reducers: createWalletReducers,
  actions,
  operations,
  initialState,
};
