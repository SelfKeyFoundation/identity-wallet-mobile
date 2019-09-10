
import { combineReducers } from 'redux';

const reducers = {};

export function addReducer(name, reducer) {
  reducers[name] = reducer;
}

export function createReducer(initialState, reducerMap) {
  const defaultReducer = state => state;
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type || 'default'] || defaultReducer;

    if (reducer) {
      return reducer(state, action);
    }
  };
}

export function getRootReducer() {
  return combineReducers(reducers);
}
