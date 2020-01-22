import reducer, { walletsReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: walletsReducers,
  actions,
  operations,
  initialState,
  selectors,
};
