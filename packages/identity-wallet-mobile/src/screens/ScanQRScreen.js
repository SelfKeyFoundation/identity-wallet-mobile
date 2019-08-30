import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ScanQRScreen() {
  return (
    <View style={styles.container}>
      <Text>Scan QR (Dummy)</Text>
    </View>
  );
}