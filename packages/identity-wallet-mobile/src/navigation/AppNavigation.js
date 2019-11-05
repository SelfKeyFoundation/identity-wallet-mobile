import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MyTokensScreen from '../screens/MyTokensScreen';
import ScanQRScreen from '../screens/ScanQRScreen';
import { TabNavigation } from '@selfkey/mobile-ui';

export const AppTabNavigator = createBottomTabNavigator({
  Dashboard: DashboardScreen,
  Settings: SettingsScreen,
  ScanQR: ScanQRScreen,
  MyTokens: MyTokensScreen,
}, {
  tabBarComponent: (props) => {
    const { navigation } = props;
    const { routes } = navigation.state;
    const route = routes[navigation.state.index];

    const items = [{
      icon: 'icon-menu-dashboard-2',
      label: 'Dashboard',
      id: 'Dashboard',
    }, {
      icon: 'icon-menu-tokens',
      label: 'My Tokens',
      id: 'MyTokens',
    }, {
      icon: 'icon-menu-qr',
      label: 'Scan QR',
      id: 'ScanQR',
    }, {
      icon: 'icon-menu-settings',
      label: 'Settings',
      id: 'Settings',
    }];

    return (
      <TabNavigation
        activeId={route.key}
        onPress={props.jumpTo}
        items={items}
      />
    );
  },
});
