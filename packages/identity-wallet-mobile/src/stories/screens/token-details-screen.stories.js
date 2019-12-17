import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import TokenDetailsScreen from '../../screens/TokenDetailsScreen';
import { reduxMockDecorator } from '@selfkey/wallet-core/utils/storybook-utils';
import { setNavigator } from '@selfkey/wallet-core/navigation';
import { setPriceData } from '@selfkey/blockchain/services/price-service';

setPriceData([{
  name: 'Ethereum',
  symbol: 'ETH',
  source: 'https://coincap.io',
  priceUSD: 250,
}, {
  name: 'SelfKey',
  symbol: 'KEY',
  source: 'https://coincap.io',
  priceUSD: 0.02,
}]);

setNavigator({
  navigate: () => {},
  getParam: () => 1,
});


storiesOf('TokenDetailsScreen', module)
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
  .add('default', () => (
    <TokenDetailsScreen
      navigation={{
        navigate: () => {},
        getParam: () => 'KEY',
      }}
    />
  ));
