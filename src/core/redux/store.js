import React from 'react';
import { Provider } from 'react-redux';
// import { createStore, compose } from 'redux'
import { getRootReducer } from './reducers';
// import { getInitialState } from './state';
import { middlewares } from './middlewares';
import {configureStore} from '@reduxjs/toolkit';

import { SchedulerService } from 'core/services/scheduler/scheduler-service';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['skAgent'],
}

export function createEnhancedStore() {
  const rootReducer = persistReducer(persistConfig, getRootReducer());

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
  });
  
  persistStore(store)

  return store;
}

export function createStoreProvider() {
  const store = createEnhancedStore();

  global.store = store;

  SchedulerService.getInstance().setStore(store);

  return ({ children }) => (
    <Provider store={store}>
      { children }
    </Provider>
  );
}

export { Provider };
