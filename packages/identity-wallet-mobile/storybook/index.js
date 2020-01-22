import React from 'react';
import { AppRegistry, SafeAreaView, StyleSheet } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MobileUIProvider, Portal } from '@selfkey/mobile-ui';
import SplashScreen from 'react-native-splash-screen';

SplashScreen.hide();

import './rn-addons';
import '../src/inject-system';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

addDecorator(storyFn => (
  <MobileUIProvider>
    <Portal.Host>
      { storyFn() }
    </Portal.Host>
  </MobileUIProvider>
));

configure(() => require('../src/stories'), module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
