import React from 'react';
import { Button as RNButton, Text } from 'native-base';


export function Button({ children, onPress }) {
  return (
    <RNButton onPress={onPress} title={children}>
    </RNButton>
  )
}