// @flow
import React, { useContext } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { PaperThemeContext, ThemeContext } from '../mobile-ui-provider';
import LinearGradient from 'react-native-linear-gradient';
import { Button as NButton } from 'native-base';
import { Theme } from '../theme';

export const Button = (props: ButtonProps) => {

  const style = {
    fontFamily: Theme.fonts.bold,
    fontSize: 14,
    textTransform: 'uppercase',
    color: Theme.colors.baseDark,
    letterSpacing: 0,
    borderRadius: '50px',
  };

  const textStyle = {
    color: "#111111"
  }

  if (props.type === 'shell-secondary') {
    style.borderColor = '#93B0C1';
    style.borderWidth = 2;
    textStyle.color = '#C5DCE9';
    style.background = 'none';
  }

  if (props.type === 'shell-primary') {
    style.background = 'none';
    style.borderColor = Theme.colors.primary;
    style.borderWidth = 2;
    textStyle.color = Theme.colors.primary;
    textStyle.top = -2;
    style.height = 40;
  }

  if (props.type === 'link') {
    style.borderWidth = 0;
    textStyle.color = Theme.colors.link;
    textStyle.fontWeight = 'normal';
    style.background = 'none';
  }

  if (!props.type || props.type === 'full-primary' || props.type === 'primary') {
    style.background = 'linear-gradient(107.37deg, #00E0FF 0%, #2DA1F8 100%)';
  }
  
  return <NButton {...props} _text={textStyle} style={style}/>
};
