import './shim.js';
import { setEnv } from '@selfkey/configs';
setEnv('dev');

import {AppRegistry} from 'react-native';
import {Root} from './src/Root';
// import Root from './storybook';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Root);
