import { createStackNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import CreatePasswordScreen from '../../screens/CreatePasswordScreen';
import DashboardScreen from '../../screens/DashboardScreen';

import { stackNavigatorConfig } from '../configs';

export const createWalletFlow = createStackNavigator({
  [Routes.CREATE_WALLET_PASSWORD]: CreatePasswordScreen,
  [Routes.CREATE_WALLET_CONFIRM_PASSWORD]: DashboardScreen,
}, stackNavigatorConfig);
