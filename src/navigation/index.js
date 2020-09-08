import React from 'react';
import { createAppContainer } from 'react-navigation';
import { RootNavigation } from './RootNavigation';
import { ReactNativeNavigator } from './rn-navigator';
import { setNavigator } from 'core/navigation';


const AppContainer = createAppContainer(RootNavigation);

function injectNavigator(node) {
  if (!node) {
    return;
  }

  const navigator = new ReactNativeNavigator(node._navigation);

  /**
   * Inject React Native navigator on wallet core
   */
  setNavigator(navigator);
}

export function NavigationContainer() {
  return <AppContainer ref={injectNavigator} />;
}
