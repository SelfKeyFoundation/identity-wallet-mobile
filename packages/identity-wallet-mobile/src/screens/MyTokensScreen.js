import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MyTokensScreen() {
  return (
    <View style={styles.container}>
      <Text>My Tokens (Dummy)</Text>
    </View>
  );
}
