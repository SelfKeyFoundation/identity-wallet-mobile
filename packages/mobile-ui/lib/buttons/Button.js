// @flow
import React, { useContext } from 'react';
import {
  ButtonProps as PaperButtonProps,
  Text,
} from 'react-native-paper';

import PaperButton from './PaperButton'; 
import { View, ActivityIndicator } from 'react-native';
import { PaperThemeContext, ThemeContext } from '../mobile-ui-provider';

export interface ButtonProps extends PaperButtonProps {
  type: 'full-primary' | 'shell-primary' | 'shell-secondary',
}

export const Button = (props: ButtonProps) => {
  const { disabled } = props;
  const paperTheme = useContext(PaperThemeContext);
  const theme = useContext(ThemeContext);

  let mode = 'contained';
  let buttonStyle = {
    height: 45,
  };

  let contentStyle = {
    height: 45,
  };

  let textStyle = {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    textTransform: 'uppercase',
    color: theme.colors.baseDark,
    letterSpacing: 0,
  };

  if (props.type === 'full-primary' && disabled) {
    buttonStyle.backgroundColor = theme.colors.primaryDisabled;
  } else if (props.type === 'shell-primary') {
    mode = 'outlined';
    buttonStyle.borderColor = theme.colors.primary;
    buttonStyle.borderWidth = 2;
    textStyle.color = theme.colors.primary;
    textStyle.top = -2;
    contentStyle.height = 42;

    if (disabled) {
      textStyle.color = theme.colors.primaryDisabled;
      buttonStyle.borderColor = theme.colors.primaryDisabled;
    }
  } else if (props.type === 'shell-secondary') {
    mode = 'outlined';
    buttonStyle.borderColor = '#93B0C1';
    buttonStyle.borderWidth = 2;
    textStyle.color = '#C5DCE9';
    contentStyle.height = 42;

    if (disabled) {
      buttonStyle.borderColor = '#586A77';
      textStyle.color = '#586A77';
    }
  } else if (props.type === 'link') {
    mode = 'outlined';
    buttonStyle.borderWidth = 0;
    textStyle.color = theme.colors.primary;

    if (disabled) {
      buttonStyle.borderColor = '#586A77';
      textStyle.color = '#586A77';
    }
  }

  // buttonStyle.flex = 1;
  // buttonStyle.justifyContent = 'center';;
  // buttonStyle.alignItems = 'center';

  return (
    <PaperButton
      {...props}
      mode={mode}
      theme={paperTheme}
      style={{
        ...buttonStyle,
        ...(props.buttonStyle || {})
      }}
      contentStyle={{
        ...contentStyle,
        ...(props.contentStyle || {})
      }}
      loading={props.isLoading}
    >
      <Text
        style={{
          ...textStyle,
          ...(props.textStyle || {})
        }}
      >
        { props.children }
      </Text>
    </PaperButton>
  );
};
