/**
 * @format
 */

import './shim.js';

import {AppRegistry} from 'react-native';
import {Root} from './src/Root';
// import Root from './storybook';
import {name as appName} from './app.jsgon';

AppRegistry.registerComponent(appName, () => Root);
