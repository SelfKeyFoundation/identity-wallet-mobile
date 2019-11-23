import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Alert, Container } from '@selfkey/mobile-ui';
import { ConfirmPassword } from '@selfkey/identity-wallet-mobile/src/screens/ConfirmPasswordScreen/ConfirmPassword';
import ConfirmPasswordScreen from '@selfkey/identity-wallet-mobile/src/screens/ConfirmPasswordScreen';
import { reduxMockDecorator } from '../../utils/decorators';

storiesOf('Create Wallet Flow', module)
  .addDecorator(reduxMockDecorator({

  }))
  .add('Confirm Password', () => (
    <ConfirmPasswordScreen
      onSubmit={action('handleSubmit')}
      password="!@#Asdf123"
    />
  ))
  .add('Confirm Password - Static', () => (
    <ConfirmPassword
      onSubmit={action('handleSubmit')}
      values={{
        password: "!@#Asdf123",
        confirmPassword: "123"
      }}
      errors={{
        password: ['required']
      }}
      onChange={field => action('handleChange', field)}
    />
  ));
