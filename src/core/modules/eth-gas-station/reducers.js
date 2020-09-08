
import { createReducer } from '../../redux/reducers';
import types from './types';

export const initialState = {
  safeLow: undefined,
  average: undefined,
  fast: undefined,
};

const update = data => {
	let result = {
		safeLow: data.safeLow,
		average: data.average,
		fast: data.fast
	};
	Object.keys(result).forEach(key => {
		result[key] = result[key] / 10;
	});
	return result;
};

function updateDataReducer(state, action) {
  const { payload } = action;

  return {
    ...state,
    ...update(payload),
  };
}

export const ethGasStationReducers = {
  updateDataReducer,
};

const reducersMap = {
  [types.UPDATE_DATA]: ethGasStationReducers.updateDataReducer,
};

export default createReducer(initialState, reducersMap);
