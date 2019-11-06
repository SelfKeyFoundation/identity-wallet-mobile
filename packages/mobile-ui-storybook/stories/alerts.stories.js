import React from 'react';
import { Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Alert, Container } from '@selfkey/mobile-ui';

storiesOf('Alerts', module)
  .add('default', () => (
    <Container centered>
      <View style={{ marginTop: 20, flex: 1 }} />
      <Alert>
        This phrase is the only way to recover your wallet if you ever forget your password. Keep it safe.
      </Alert>
    </Container>
  ));
