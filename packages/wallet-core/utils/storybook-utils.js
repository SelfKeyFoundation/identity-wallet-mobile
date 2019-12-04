import React from 'react';
import { createReduxMockProvider } from '../redux/test-utils';

export function reduxMockDecorator(state) {
  const Provider = createReduxMockProvider(state);

  return getStory => (
    <Provider>
      {getStory()}
    </Provider>
  )
}