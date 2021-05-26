import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ducks from 'core/modules';
import { TabNavigation } from 'design-system';
import { Routes, navigate } from 'core/navigation';
import { WalletTracker } from '../WalletTracker';

export function AppTabBar(props) {
	const dispatch = useDispatch();
	const isKeyFiEnabled = useSelector(ducks.app.selectors.getKeyFiEnabled);
	const network = useSelector(ducks.app.selectors.getNetwork);
	const { navigation } = props;
	const { routes } = navigation.state;
	const route = routes[navigation.state.index];

	const items = [
		{
			icon: 'icon-menu-dashboard',
			label: 'Dashboard',
			id: Routes.APP_DASHBOARD,
		},
		{
			icon: 'icon-menu-tokens',
			label: 'My Tokens',
			id: Routes.APP_MY_TOKENS,
		},
		network.featureFlags.marketplaces
			? {
					icon: 'icon-menu-marketplace',
					label: 'Marketplace',
					id: Routes.MARKETPLACE_CATEGORIES,
			  }
			: {
					icon: 'icon-menu-qr',
					label: 'Scan QR',
					id: Routes.APP_SCAN_QR,
			  },
		{
			icon: 'icon-menu-profile',
			label: 'Profile',
			id: Routes.APP_MY_PROFILE,
		},
		{
			icon: 'icon-menu-settings',
			label: 'Settings',
			id: Routes.APP_SETTINGS,
		},
	];

	const handleNavigate = route => {
		const item = items.find(item => item.id === route);
		const itemLabel = item && item.label;

		WalletTracker.trackEvent({
			category: `navigation/${itemLabel}`,
			action: 'press',
			level: 'machine',
		});

		if (route === Routes.APP_MY_PROFILE) {
			dispatch(ducks.identity.operations.navigateToProfileOperation());
			return;
		}

		navigate(route);
	};

	return <TabNavigation activeId={route && route.key} onPress={handleNavigate} items={items} />;
}