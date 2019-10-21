import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import './rn-addons';

addDecorator(storyFn => (
  <PaperProvider>
    { storyFn() }
  </PaperProvider>
));

configure(() => require('../stories'), module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('SelfKeyMobileUI', () => StorybookUIRoot);

export default StorybookUIRoot;
