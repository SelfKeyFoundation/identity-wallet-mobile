// @flow
import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button } from '@selfkey/mobile-ui';

storiesOf('Buttons', module)
  .add('Full Primary', () => (
    <Container centered>
      <View style={{ margin: 5 }}>
        <Button
          onPress={action('buttons-press')}
          type="full-primary"
        >
          Full Primary
        </Button>
      </View>
      <View style={{ margin: 5 }}>
        <Button
          onPress={action('buttons-press')}
          type="full-primary"
          disabled
        >
          Disabled
        </Button>
      </View>
    </Container>
  ))
  .add('Shell Primary', () => (
    <Container centered style={{ }}>
      <View style={{ margin: 5 }}>
        <Button
          onPress={action('buttons-press')}
          type="shell-primary"
        >
          Shell Primary
        </Button>
      </View>
      <View style={{ margin: 5 }}>
        <Button
          onPress={action('buttons-press')}
          type="shell-primary"
          disabled
        >
          Disabled
        </Button>
      </View>
    </Container>
  ))
  .add('Shell Secondary', () => (
    <Container centered style={{ }}>
      <View style={{ margin: 5 }}>
        <Button
          onPress={action('buttons-press')}
          type="shell-secondary"
        >
          Shell Secondary
        </Button>
      </View>
      <View style={{ margin: 5 }}>
        <Button
          onPress={action('buttons-press')}
          type="shell-secondary"
          disabled
        >
          Disabled
        </Button>
      </View>
    </Container>
  ));
