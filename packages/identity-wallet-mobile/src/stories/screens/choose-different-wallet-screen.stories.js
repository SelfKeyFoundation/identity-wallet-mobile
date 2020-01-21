import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { reduxMockDecorator } from '@selfkey/wallet-core/utils/storybook-utils';
import ChooseDifferentWalletScreen from '../../screens/ChooseDifferentWalletScreen';
import WalletSelectionScreen from '../../screens/WalletSelectionScreen';
import ImportWalletBackupScreen from '../../screens/ImportWalletBackupScreen';


storiesOf('Choose Different Wallet', module)
  .addDecorator(reduxMockDecorator({
    
  }))
  .add('ChooseDifferentWalletScreen', () => (
    <ChooseDifferentWalletScreen />
  ))
  .add('WalletSelectionScreen', () => (
    <WalletSelectionScreen />
  ))
  .add('ImportWalletBackupScreen', () => (
    <ImportWalletBackupScreen />
  ))

  
