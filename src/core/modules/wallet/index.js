import reducer, { walletReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: walletReducers,
  actions,
  operations,
  initialState,
  selectors,
};
