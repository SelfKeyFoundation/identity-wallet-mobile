// @flow
import React, { useEffect } from 'react';
import './setup-redux';
import './db';
import { createStoreProvider } from '@selfkey/wallet-core/redux';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import { MobileUIProvider } from '@selfkey/mobile-ui';



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

