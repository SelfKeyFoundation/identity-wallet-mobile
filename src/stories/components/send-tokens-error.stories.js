import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { bool } from '@storybook/addons-knobs';

import { Button, ScreenContainer } from 'design-system';
import { SendTokensError } from '../../components';

storiesOf('components', module)
  .add('SendTokensError', () => (
    <ScreenContainer>
      <SendTokensError
        visible={true}
        onQRCode={() => console.log('QR Code')}
        onCopy={() => console.log('Copy Address')}
        onInfo={() => console.log('Error info')}
        onClose={() => console.log('On close')}
        errorInfo="To learn more about transaction fees, click here."
        errorMessage={`You don't have enough Ethereum (ETH) to pay for the network transaction fee. Please transfer some ETH to your following wallet and try again.`}
        address="0x4ac0d9ebd28118cab68a64ad8eb8c07c0120ebf8"
      />
    </ScreenContainer>
  ));
