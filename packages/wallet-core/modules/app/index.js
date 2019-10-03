import reducer, { appReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';

export default {
  reducer,
  reducers: appReducers,
  actions,
  operations,
  initialState,
};
