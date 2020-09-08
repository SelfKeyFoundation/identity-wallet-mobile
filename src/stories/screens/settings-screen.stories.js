import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { SettingsMenu } from '../../screens/SettingsScreen/SettingsMenu';

storiesOf('Settings', module)
  .add('default', () => (
    <SettingsMenu />
  ));