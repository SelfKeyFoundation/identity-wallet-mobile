import reducer, { appReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: appReducers,
  actions,
  operations,
  initialState,
  selectors,
};
