import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { ConfirmPassword } from '../../screens/ConfirmPasswordScreen/ConfirmPassword';

storiesOf('Create Wallet', module)
  .add('Confirm Password - Static', () => (
    <ConfirmPassword
      onSubmit={action('handleSubmit')}
      values={{
        password: '!@#Asdf123',
        confirmPassword: '123',
      }}
      errors={{
        password: ['required'],
      }}
      onChange={field => action('handleChange', field)}
    />
  ));
