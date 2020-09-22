import reducer, { kycReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: kycReducers,
  actions,
  operations,
  initialState,
  selectors,
};
