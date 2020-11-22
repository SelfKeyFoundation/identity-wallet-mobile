import reducer, { contractReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: contractReducers,
  actions,
  operations,
  initialState,
  selectors,
};
