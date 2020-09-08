import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { reduxMockDecorator } from 'core/utils/storybook-utils';
import ImportFromDesktopScreen from '../../screens/ImportFromDesktopScreen';

storiesOf('Import From Desktop', module)
  .addDecorator(reduxMockDecorator({
  }))
  .add('Default', () => (
    <ImportFromDesktopScreen />
  ));
