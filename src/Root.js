// @flow
import React from 'react';
import './setup-redux';
import './inject-system';
import './rn-identity-vault/index';
import './db';
import { createStoreProvider } from 'core/redux';
import { MobileUIProvider, Portal } from 'design-system';
import { TermsOfService } from './components';
import App from './App';

const Provider = createStoreProvider();

type RootProps = {
  children: any,
};

export function Root(props: RootProps) {
  console.log('Loading root');

  return (
    <Provider>
      <MobileUIProvider>
        <Portal.Host>
          <App />
        </Portal.Host>
      </MobileUIProvider>
    </Provider>
  );
}

