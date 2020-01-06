import reducer, { txHistoryReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: txHistoryReducers,
  actions,
  operations,
  initialState,
  selectors,
};
