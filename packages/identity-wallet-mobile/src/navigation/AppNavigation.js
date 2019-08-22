import { createBottomTabNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MyTokensScreen from '../screens/MyTokensScreen';
import ScanQRScreen from '../screens/ScanQRScreen';

export const AppTabNavigator = createBottomTabNavigator({
  Dashboard: DashboardScreen,
  Settings: SettingsScreen,
  ScanQR: ScanQRScreen,
  MyTokens: MyTokensScreen,
});
