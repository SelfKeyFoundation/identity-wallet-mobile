// @flow
import React, { useState, useCallback } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { TabNavigation, Container } from '@selfkey/mobile-ui';

function TabExample() {
  const [selected, setSelected] = useState('Dashboard');

  const items = [{
    icon: 'icon-menu-dashboard',
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

  const  handlePress = useCallback((id) => setSelected(id), [selected]);

  return (
    <TabNavigation
      items={items}
      activeId={selected}
      onPress={handlePress}
    />
  )
}
storiesOf('Navigation', module)
  .add('TabNavigation', () => (
    <Container centered>
      <TabExample />
    </Container>
  ))
