import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import { AppTabBar } from '../../components/AppTabBar';
import SettingsScreen from '../../screens/SettingsScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import MyTokensScreen from '../../screens/MyTokensScreen';
import ScanQRScreen from '../../screens/ScanQRScreen';
import { stackNavigatorConfig } from '../configs';

export const appTabNavigation = createBottomTabNavigator({
  [Routes.APP_DASHBOARD]: DashboardScreen,
  [Routes.APP_SETTINGS]: SettingsScreen,
  [Routes.APP_SCAN_QR]: ScanQRScreen,
  [Routes.APP_MY_TOKENS]: MyTokensScreen,
}, {
  tabBarComponent: AppTabBar,
});

export const appFlow: SwitchNavigatorType = createStackNavigator({
  [Routes.APP_TAB_NAVIGATION]: appTabNavigation,
  // We might use other flows inside of app where the tabs will not be visible
  // these flows can be placed here
}, stackNavigatorConfig);
