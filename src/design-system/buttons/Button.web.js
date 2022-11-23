// @flow
import React, { useContext } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { PaperThemeContext, ThemeContext } from '../mobile-ui-provider';
import LinearGradient from 'react-native-linear-gradient';
import { Button as NButton } from 'native-base';

export const Button = (props: ButtonProps) => {
  return <NButton {...props} />
};
