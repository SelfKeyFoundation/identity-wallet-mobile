import reducer, { modalReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: modalReducers,
  actions,
  operations,
  initialState,
  selectors,
};
