import { createStackNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';

import { LoadingScreen } from '../../screens/loading-screen';
import { stackNavigatorConfig } from '../configs';

export const loadingFlow = createStackNavigator({
  [Routes.LOADING]: LoadingScreen,
}, stackNavigatorConfig);
