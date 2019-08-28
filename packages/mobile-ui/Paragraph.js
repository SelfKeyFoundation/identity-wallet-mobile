
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

export function Paragraph({ children }) {
  return <Text>Paragraph: { children }</Text>;
}