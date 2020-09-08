import reducer, { unlockWalletReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: unlockWalletReducers,
  actions,
  operations,
  initialState,
  selectors,
};
