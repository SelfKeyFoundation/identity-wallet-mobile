import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { TokenDetails } from '../../components';

storiesOf('components', module)
  .add('TokenDetails', () => (
    <TokenDetails
      tokenId="key"
      tokenAmount={85262.781}
      currencyId="usd"
      currencyAmount={951.44}
    />
  ));
