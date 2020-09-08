import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import SendTokensScreen from '../../screens/SendTokensScreen';
import { reduxMockDecorator } from 'core/utils/storybook-utils';

storiesOf('Send Transaction Screen', module)
  .addDecorator(reduxMockDecorator({
    transaction: {
      address: '0xcfec6722f119240b97effd5afe04c8a97caa02ee',
      token: 'eth',
      amount: '0.001',
      errors: {
        transaction: 'Transaction Error: You don\'t have enough Ethereum (ETH) for the network transaction fee. Please transfer ETH to your wallet and try again.',
        // address: 'Invalid address. Please check and try again'
      },
      advancedMode: true,
      transactionFee: 'slow',
      transactionFeeOptions: [{
        id: 'slow',
        name: 'Slow',
        ethAmount: 0.00047,
        fiatAmount: 0.1,
        time: '5-30 min',
      }, {
        id: 'normal',
        name: 'Normal',
        ethAmount: 0.0023,
        fiatAmount: 0.5,
        time: '2-5 min',
      }, {
        id: 'fast',
        name: 'Fast',
        ethAmount: 0.0047,
        fiatAmount: 1.00,
        time: '< 2 min',
      }]
    },
    wallet: {
      balance: 1.4,
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
  .add('default', () => (
    <SendTokensScreen />
  ));
