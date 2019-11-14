import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

export function createMockStore(state) {
  const mockStore = configureStore();
  return mockStore(state);
}

export function createReduxMockProvider(state) {
  const store = createMockStore(state);

  return (props) => (
    <Provider store={store}>
      { props.children}
    </Provider>
  );
}
