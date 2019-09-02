import React from 'react';
import { View } from 'react-native';
import { Paragraph } from '@selfkey/mobile-ui/lib/Paragraph';

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paragraph>Dashboard Screen (Dummy)</Paragraph>
    </View>
  );
}