
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { StakingDashboard } from 'screens/StakingDashboardScreen/StakingDashboard';
import { reduxMockDecorator } from 'core/utils/storybook-utils';

storiesOf('Staking Dashboard', module)
  .addDecorator(reduxMockDecorator({
    txHistory: {
      transactions: [{
        tokenSymbol: 'KEY',
        status: 'sent',
        value: 1.25,
        timeStamp: 1601477201121,
        
      }, {
        tokenSymbol: 'KEY',
        status: 'received',
        value: 0.4,
        timeStamp: 1601477201121,
        
      }, {
        tokenSymbol: 'KEY',
        status: 'sending',
        value: 0.4,
        timeStamp: 1601477201121,
        
      }, {
        tokenSymbol: 'KEY',
        status: 'receiving',
        value: 0.4,
        timeStamp: 1601477201121,
      }]
    }
  }))
  .add('Staking Dashboard - Static', () => (
    <StakingDashboard />
  ));

  
