import reducer, { createWalletReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: createWalletReducers,
  actions,
  operations,
  initialState,
  selectors,
};
