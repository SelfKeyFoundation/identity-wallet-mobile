import React from 'react';
import { getRootReducer } from './reducers';

export function createStore() {
  return {
  }
}

export function StoreProvider({ children }) {
  return (
    children
  );
}

export function createStoreProvider() {
  return (props) => {
    <StoreProvider {...props} store={createStore()} />;
  };
}
