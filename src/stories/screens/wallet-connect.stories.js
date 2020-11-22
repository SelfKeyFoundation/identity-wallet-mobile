
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { reduxMockDecorator } from 'core/utils/storybook-utils';
import { ConfirmConnectionModal } from 'screens/walletConnect/ConfirmConnectionModal';
import { ConfirmTransactionModal } from 'screens/walletConnect/ConfirmTransactionModal';


storiesOf('Wallet Connect', module)
  .addDecorator(reduxMockDecorator({
    walletConnect: {
      // confirmConnection: {
      //   url: 'keyfi.com.br',
      // },
      confirmTransaction: {
        amount: 0,
      },
    },
  }))
  .add('Confirm Modal', () => (
    <ConfirmConnectionModal />
  ))
  .add('Confirm Transaction', () => (
    <ConfirmTransactionModal />
  ));
