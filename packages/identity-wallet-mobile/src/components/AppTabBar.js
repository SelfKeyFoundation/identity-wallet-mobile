import React from 'react';
import { TabNavigation } from '@selfkey/mobile-ui';
import { Routes, navigate } from '@selfkey/wallet-core/navigation';
import { WalletTracker } from '../WalletTracker';

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
    icon: 'icon-menu-profile',
    label: 'My Profile',
    id: Routes.APP_MY_PROFILE,
  }, {
    icon: 'icon-menu-settings',
    label: 'Settings',
    id: Routes.APP_SETTINGS,
  }];

  const handleNavigate = (route) => {
    const item = items.find(item => item.id === route);
    const itemLabel = item && item.label;

    WalletTracker.trackEvent({
      category: `navigation/${itemLabel}`,
      action: 'press',
      level: 'machine'
    });

    navigate(route);
  }

  return (
    <TabNavigation
      activeId={route.key}
      onPress={handleNavigate}
      items={items}
    />
  );
}