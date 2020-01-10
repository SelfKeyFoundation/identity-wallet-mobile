import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ScanQRScreen from '../../screens/ScanQRScreen';
import { reduxMockDecorator } from '@selfkey/wallet-core/utils/storybook-utils';

storiesOf('Scan QR Screen', module)
  .addDecorator(reduxMockDecorator({
    
  }))
  .add('default', () => (
    <ScanQRScreen
      navigation={{
        getParam: () => 'transaction'
      }}
    />
  ));
