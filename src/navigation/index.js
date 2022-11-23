import React from 'react';
// import { createAppContainer } from 'react-navigation';
// import { RootNavigation } from './RootNavigation';
import { ReactNativeNavigator } from './rn-navigator';
import { setNavigator } from 'core/navigation';
import { NavigationContainer as AppContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../core/navigation';
import {loadingFlow} from './flows/loading-flow';
import {createWalletFlow} from './flows/create-wallet-flow';
import {appFlow} from './flows/app-flow';

function injectNavigator(node) {
  if (!node) {
    return;
  }

  const navigator = new ReactNativeNavigator(node);

  /**
   * Inject React Native navigator on wallet core
   */
  setNavigator(navigator);
}

const Stack = createNativeStackNavigator();

const renderRoutes = (flow) => Object.keys(flow).map(route => {
  return <Stack.Screen key={route} name={route} component={flow[route]} options={{
    headerShown: false
  }}/>
})

export function NavigationContainer() {
  return (
    <AppContainer ref={injectNavigator}>
      <Stack.Navigator>
        {
          renderRoutes(loadingFlow)
        }
        {
          renderRoutes(createWalletFlow)
        }
        {
          renderRoutes(appFlow)
        }
      </Stack.Navigator>
    </AppContainer>
  )
}
