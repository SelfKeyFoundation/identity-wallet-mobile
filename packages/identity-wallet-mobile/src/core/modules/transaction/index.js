import reducer, { transactionReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: transactionReducers,
  actions,
  operations,
  initialState,
  selectors,
};
