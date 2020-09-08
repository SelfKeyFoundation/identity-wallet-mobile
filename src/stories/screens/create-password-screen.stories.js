import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { CreatePassword } from '../../screens/CreatePasswordScreen/CreatePassword';

storiesOf('Create Wallet', module)
  .add('Create Password - Static', () => (
    <CreatePassword
      onSubmit={action('handleSubmit')}
      values={{
        password: '123',
      }}
      errors={{
        password: ['min_value', 'symbol_and_number'],
      }}
      passwordStrength="Weak"
      onChange={field => action('handleChange', field)}
    />
  ));
