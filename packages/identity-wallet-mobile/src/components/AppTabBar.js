import React from 'react';
import { TabNavigation } from '@selfkey/mobile-ui';
import { Routes, navigate } from '@selfkey/wallet-core/navigation';

export function AppTabBar(props) {
  const { navigation } = props;
  const { routes } = navigation.state;
  const route = routes[navigation.state.index];

  const items = [{
    icon: 'icon-menu-dashboard',
    label: 'Dashboard',
    id: Routes.APP_DASHBOARD,
  }, {
    icon: 'icon-menu-tokens',
    label: 'My Tokens',
    id: Routes.APP_MY_TOKENS,
  }, {
    icon: 'icon-menu-qr',
    label: 'Scan QR',
    id: Routes.APP_SCAN_QR,
  }, {
    icon: 'icon-menu-settings',
    label: 'Settings',
    id: Routes.APP_SETTINGS,
  }];

  return (
    <TabNavigation
      activeId={route.key}
      onPress={navigate}
      items={items}
    />
  );
}