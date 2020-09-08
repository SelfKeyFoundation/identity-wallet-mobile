import reducer, { identityReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: identityReducers,
  actions,
  operations,
  initialState,
  selectors,
};
