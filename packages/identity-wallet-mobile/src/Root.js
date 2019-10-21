// @flow
import React, { useEffect } from 'react';
import './setup-redux';
import './db';
import { createStoreProvider } from '@selfkey/wallet-core/redux';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';

const Provider = createStoreProvider();

type RootProps = {
  children: any,
};

export function Root(props: RootProps) {
  return (
    <Provider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
}

