import './shim.web.js';
// import { setEnv } from 'configs';
// import appVersion from './app-version.js';
import React from 'react';
import {View, Text} from 'react-native';
import * as ReactDOM from 'react-dom';
// import './test.js';


import {AppState } from 'react-native';
import {Root} from './src/Root';

// export function Root(props: RootProps) {
//     console.log('Loading root');
  
//     return (
//       <View>
//         <Text>Test</Text>
//       </View>
//     );
//   }

// const webRoot = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(<Root />, document.getElementById('root'));
