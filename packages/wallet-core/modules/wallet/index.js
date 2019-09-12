import reducer, { walletReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';

export default {
  reducer,
  reducers: walletReducers,
  actions,
  operations,
  initialState,
};
