import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Alert, Container } from '@selfkey/mobile-ui';
import { BackupWallet } from '@selfkey/identity-wallet-mobile/src/screens/BackupWalletScreen/BackupWallet';
// import { reduxMockDecorator } from '../../utils/decorators';

storiesOf('Create Wallet Flow', module)
  // .addDecorator(reduxMockDecorator({
  //   createWallet: {
  //     password: '123',
  //     mnemonicPhrase: 'scent foot car fact market advice  friends cow chicken title skirt stone'
  //   }
  // }))
  .add('Backup Wallet', () => (
    <BackupWallet
      onSubmit={action('handleSubmit')}
      mnemonicPhrase="scent foot car fact market advice  friends cow chicken title skirt stone"
    />
  ))
