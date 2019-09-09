import React from 'react';
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { getRootReducer } from './reducers';
import { getInitialState } from './state';
import { getMiddlewareEnhancer } from './middlewares';

export function createEnhancedStore() {
  const rootReducer = getRootReducer();
  const initialState = getInitialState();
  const composedEnhancers = compose(
    getMiddlewareEnhancer(),
  );

  return createStore(rootReducer, initialState, composedEnhancers);
}

export function createStoreProvider() {
  const store = createEnhancedStore();

  return ({ children }) => (
    <Provider store={store}>
      { children }
    </Provider>
  );
}
