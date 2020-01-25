import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { reduxMockDecorator } from '@selfkey/wallet-core/utils/storybook-utils';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import { ForgotPassword } from '../../screens/ForgotPasswordScreen/ForgotPassword';

storiesOf('ForgotPasswordScreen', module)
  .addDecorator(reduxMockDecorator({}))
  .add('default', () => (
    <ForgotPasswordScreen />
  ))
  .add('error', () => (
    <ForgotPassword
      error="The recovery phrase is not correct, please try again."
    />
  ))
  
