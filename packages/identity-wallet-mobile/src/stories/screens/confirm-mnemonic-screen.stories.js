import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { reduxMockDecorator } from 'core/utils/storybook-utils';
import ConfirmMnemonicScreen from '../../screens/ConfirmMnemonicScreen';

storiesOf('Create Wallet', module)
  .addDecorator(reduxMockDecorator({
    createWallet: {
      mnemonicPhrase: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
      shuffledMnemonic: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
      mnemonicConfirmation: 'twenty region any vicious convince',
      confirmationError: 'Current order doesn’t match your Recovery Phrase. Please try again.'
    }
  }))
  .add('Confirm Mnemonic - Static', () => (
    <ConfirmMnemonicScreen />
  ));
