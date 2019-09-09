
import { combineReducers } from 'redux';

const reducers = {};

export function addReducer(name, reducer) {
  reducers[name] = reducer;
}

export function getRootReducer() {
  return combineReducers(reducers);
}
