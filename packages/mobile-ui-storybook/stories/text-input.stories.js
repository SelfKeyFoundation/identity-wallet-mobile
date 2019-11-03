// @flow
import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { TextInput, Container } from '@selfkey/mobile-ui';

storiesOf('TextInput', module)
  .add('default', () => (
    <Container centered>
      <View style={{ width: 200 }}>
        <TextInput
          error={true}
          errorMessage="Error message"
          value="Invalid value"
          placeholder="Name"
          label="Error"
          onChangeText={action('Input changed')}
        />
      </View>
      <View style={{ width: 200 }}>
        <TextInput
          value="With value"
          placeholder="Name"
          label="Filled"
          onChangeText={action('Input changed')}
        />
      </View>
      <View style={{ width: 200 }}>
        <TextInput
          placeholder="This is the placeholder"
          label="Normal"
          onChangeText={action('Input changed')}
        />
      </View>
      <View style={{ width: 200 }}>
        <TextInput
          disabled={true}
          placeholder="Disabled input"
          label="Disabled"
          onChangeText={action('Input changed')}
        />
      </View>
    </Container>
  ))
