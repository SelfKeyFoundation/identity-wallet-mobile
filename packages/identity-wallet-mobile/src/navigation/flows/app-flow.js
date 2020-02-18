import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import { AppTabBar } from '../../components/AppTabBar';
import SettingsScreen from '../../screens/SettingsScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import ReceiveTokensScreen from '../../screens/ReceiveTokensScreen';
import SendTokensScreen from '../../screens/SendTokensScreen';
import MyTokensScreen from '../../screens/MyTokensScreen';
import ScanQRScreen from '../../screens/ScanQRScreen';
import CreateBackupScreen from '../../screens/CreateBackupScreen';
import CustomTokensScreen from '../../screens/CustomTokensScreen';
import TokenDetailsScreen from '../../screens/TokenDetailsScreen';
import CreateNewPasswordScreen from '../../screens/CreateNewPasswordScreen';
import ConfirmNewPasswordScreen from '../../screens/ConfirmNewPasswordScreen';
import RecoveryInformationScreen from '../../screens/RecoveryInformationScreen';
import DevSettingsScreen from '../../screens/DevSettingsScreen';

import { stackNavigatorConfig } from '../configs';

export const appTabNavigation = createBottomTabNavigator({
  [Routes.APP_DASHBOARD]: DashboardScreen,
  [Routes.APP_RECEIVE_TOKENS]: ReceiveTokensScreen,
  [Routes.APP_SEND_TOKENS]: SendTokensScreen,
  [Routes.APP_SETTINGS]: SettingsScreen,
  [Routes.APP_SCAN_QR]: ScanQRScreen,
  [Routes.APP_MY_TOKENS]: MyTokensScreen,
}, {
  tabBarComponent: AppTabBar,
});

export const appFlow: SwitchNavigatorType = createStackNavigator({
  [Routes.APP_TAB_NAVIGATION]: appTabNavigation,
  [Routes.TOKEN_DETAILS]: TokenDetailsScreen,
  [Routes.CUSTOM_TOKENS]: CustomTokensScreen,
  [Routes.SCAN_QR]: ScanQRScreen,
  [Routes.CREATE_BACKUP]: CreateBackupScreen,
  [Routes.WALLET_NEW_PASSWORD]: CreateNewPasswordScreen,
  [Routes.WALLET_CONFIRM_NEW_PASSWORD]: ConfirmNewPasswordScreen,
  [Routes.RECOVERY_INFORMATION]: RecoveryInformationScreen,
  [Routes.DEVELOPER_SETTINGS]: DevSettingsScreen,
  // We might use other flows inside of app where the tabs will not be visible
  // these flows can be placed here
}, stackNavigatorConfig);
