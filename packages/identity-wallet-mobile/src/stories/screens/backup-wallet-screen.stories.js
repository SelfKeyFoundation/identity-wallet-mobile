import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { BackupWallet } from '../../screens/BackupWalletScreen/BackupWallet';

storiesOf('Create Wallet', module)
  .add('Backup Wallet', () => (
    <BackupWallet
      onSubmit={action('handleSubmit')}
      mnemonicPhrase="scent foot car fact market advice  friends cow chicken title skirt stone"
    />
  ));
