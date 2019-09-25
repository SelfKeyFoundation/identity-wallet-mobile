import React from 'react';
import { View } from 'react-native';
import { Paragraph } from '@selfkey/mobile-ui/lib/Paragraph';
import Logo from './Centered.svg';

export function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logo />
      <Paragraph>IDENTITY WALLET</Paragraph>
    </View>
  );
}

export default LoadingScreen;
