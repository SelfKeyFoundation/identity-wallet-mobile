import reducer, { ethGasStationReducers, initialState } from './reducers';
import actions from './actions';
import operations from './operations';
import * as selectors from './selectors';

export default {
  reducer,
  reducers: ethGasStationReducers,
  actions,
  operations,
  initialState,
  selectors,
};
