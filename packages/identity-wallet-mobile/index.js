/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Root} from './src/Root';
import {name as appName} from './app.json';
import './shim.js';

AppRegistry.registerComponent(appName, () => Root);
