import reducer, { schedulerReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: schedulerReducers,
  actions,
  operations,
  initialState,
  selectors,
};
