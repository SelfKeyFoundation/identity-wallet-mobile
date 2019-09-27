import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkBackground, SkLogo, Paragraph } from '@selfkey/mobile-ui/lib';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function LoadingScreen() {
  return (
    <SkBackground>
      <View style={styles.container}>
        <SkLogo />
        <Paragraph>IDENTITY WALLET</Paragraph>
      </View>
    </SkBackground>
  );
}
