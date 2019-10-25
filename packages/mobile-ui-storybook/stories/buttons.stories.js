import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { PrimaryButton } from '@selfkey/mobile-ui/lib/buttons/PrimaryButton';

storiesOf('Buttons', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {getStory()}
    </View>
  ))
  .add('Primary', () => (
    <PrimaryButton onPress={action('buttons-press')}>
      Primary Button
    </PrimaryButton>
  ))
