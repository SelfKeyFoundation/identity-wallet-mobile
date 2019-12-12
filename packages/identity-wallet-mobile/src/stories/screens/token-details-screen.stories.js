import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import TokenDetailsScreen from '../../screens/TokenDetailsScreen';
import { reduxMockDecorator } from '@selfkey/wallet-core/utils/storybook-utils';

storiesOf('TokenDetailsScreen', module)
  .addDecorator(reduxMockDecorator({

  }))
  .add('default', () => (
    <TokenDetailsScreen />
  ));
