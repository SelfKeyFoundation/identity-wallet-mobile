import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dashboard } from '../../screens/DashboardScreen/Dashboard';
import { reduxMockDecorator } from '@selfkey/wallet-core/utils/storybook-utils';

storiesOf('Dashboard Screen', module)
  .addDecorator(reduxMockDecorator({

  }))
  .add('Dashboard - Static', () => (
    <Dashboard />
  ));
