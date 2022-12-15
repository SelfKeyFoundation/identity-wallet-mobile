// @flow
import React, { useContext } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { PaperThemeContext, ThemeContext } from '../mobile-ui-provider';
import LinearGradient from 'react-native-linear-gradient';
import { Button as NButton } from 'native-base';

export const Button = (props: ButtonProps) => {
  return <NButton {...props} _text={{
    color: "#111111"
  }} style={{
    background: 'linear-gradient(107.37deg, #00E0FF 0%, #2DA1F8 100%)'
  }}/>
};
