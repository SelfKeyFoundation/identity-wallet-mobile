import './shim.js';
import { setEnv } from '@selfkey/configs';
import appVersion from './app-version.json';
import * as Keychain from './src/rn-identity-vault/keychain';

Keychain.getItem('wallet-env').then(currentEnv => {
  setEnv((currentEnv && currentEnv.value) || appVersion.env);
});

import {AppRegistry} from 'react-native';
import {Root} from './src/Root';
// import Root from './storybook';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Root);
