// @flow
import React, { useEffect } from 'react';
import './setup-redux';
import './db';
import { createStoreProvider } from '@selfkey/wallet-core/redux';
import App from './App';

const Provider = createStoreProvider();

type RootProps = {
  children: any,
};

export function Root(props: RootProps) {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

