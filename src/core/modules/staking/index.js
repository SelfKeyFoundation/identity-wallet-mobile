import reducer, { stakingReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: stakingReducers,
  actions,
  operations,
  initialState,
  selectors,
};
