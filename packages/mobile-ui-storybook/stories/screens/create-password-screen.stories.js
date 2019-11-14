import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Alert, Container } from '@selfkey/mobile-ui';
import { CreatePassword } from '@selfkey/identity-wallet-mobile/src/screens/CreatePasswordScreen/CreatePassword';
import CreatePasswordScreen from '@selfkey/identity-wallet-mobile/src/screens/CreatePasswordScreen';

storiesOf('Create Wallet Flow', module)
  .add('Create Password', () => (
    <CreatePasswordScreen
      onSubmit={action('handleSubmit')}
    />
  ))
  .add('Create Password - Static', () => (
    <CreatePassword
      onSubmit={action('handleSubmit')}
      values={{
        password: '123',
      }}
      errors={{
        password: ['min_value', 'symbol_and_number']
      }}
      passwordStrenght="Weak"
      onChange={field => action('handleChange', field)}
    />
  ));
