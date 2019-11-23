// @flow
import React from 'react';
import './rn-identity-vault/index';
import './setup-redux';
import './db';
import { createStoreProvider } from '@selfkey/wallet-core/redux';
import { MobileUIProvider } from '@selfkey/mobile-ui';
import App from './App';

const Provider = createStoreProvider();

type RootProps = {
  children: any,
};

export function Root(props: RootProps) {
  return (
    <Provider>
      <MobileUIProvider>
        <App />
      </MobileUIProvider>
    </Provider>
  );
}

