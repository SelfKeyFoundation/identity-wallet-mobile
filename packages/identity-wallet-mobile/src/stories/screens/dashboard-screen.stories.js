import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dashboard } from '../../screens/DashboardScreen/Dashboard';
import { reduxMockDecorator } from 'core/utils/storybook-utils';

storiesOf('Dashboard Screen', module)
  .addDecorator(reduxMockDecorator({
    wallet: {
      balance: 1,
      tokens: [{
        id: 1,
        address: '0xcfec6722f119240b97effd5afe04c8a97caa02ee',
        decimal: 18,
        symbol: 'KI'
      }, {
        id: 2,
        address: '0xcfec6722f119240b97effd5afe04c8a97caa02ee',
        decimal: 18,
        symbol: 'KEY'
      }]
    }
  }))
  .add('Dashboard - Static', () => (
    <Dashboard />
  ));
