import React from 'react';
import Navigation from './navigation';
import './setup-redux';
import { createStoreProvider } from '@selfkey/wallet-core/redux';

const Provider = createStoreProvider();

export default function App() {
  return (
    <Provider>
      <Navigation />
    </Provider>
  );
}
