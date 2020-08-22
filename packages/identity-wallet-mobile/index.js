import './shim.js';
import { setEnv } from '@selfkey/configs';
import appVersion from './app-version.json';
import * as Keychain from './src/rn-identity-vault/keychain';
import { WalletTracker } from './src/WalletTracker';

Keychain.getItem('wallet-env').then(currentEnv => {
  setEnv((currentEnv && currentEnv.value) || appVersion.env);
});

import {AppRegistry, AppState } from 'react-native';
import {Root} from './src/Root';
// import Root from './storybook';
import {name as appName} from './app.json';

WalletTracker.trackEvent({
  action: 'open',
  category: 'app',
  level: 'machine'
});

AppRegistry.registerComponent(appName, () => Root);

let loaded = false;

AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'active' && loaded) {
    WalletTracker.trackEvent({
      action: 'resumed',
      category: 'app',
      level: 'machine'
    });
  }

  if (nextAppState === 'inactive' || nextAppState === 'background') {
    WalletTracker.trackEvent({
      action: 'closed',
      category: 'app',
      level: 'machine'
    }, {
      priority: 0
    });
  }

  loaded = true;
});
