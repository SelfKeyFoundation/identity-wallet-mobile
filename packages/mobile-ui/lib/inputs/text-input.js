// @flow
import React, { useContext } from 'react';
import {
  // TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
  Text,
} from 'react-native-paper';

import PaperTextInput from './paper-override/TextInput';

import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from 'react-native';

import { PaperThemeContext, ThemeContext } from '../mobile-ui-provider';

export interface TextInputProps extends PaperTextInputProps {
  errorMessage?: string,
}

const renderInput = (inputProps: TextInputProps, theme: any) => (props: NativeTextInputProps) => {
  const style = [...props.style];

  if (inputProps.error) {
    style.push({
      backgroundColor: 'rgba(255,106,106,0.05)',
      color: theme.colors.error,
    });
  }

  style.push({
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
  });

  return (
    <NativeTextInput
      {...props}
      style={style}
    />
  );
};


// TODO: Error message
// TODO: Focus state colors

export const TextInput = (props: TextInputProps) => {
  const paperTheme = useContext(PaperThemeContext);
  const theme = useContext(ThemeContext);
  const { label, ...oProps} = props;

  // border-color: #485A6E

  return (
    <View>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Text
          style={{
            color: props.disabled ? theme.colors.disabled : theme.colors.typography,
            textTransform: 'uppercase',
            fontFamily: theme.fonts.bold,
            fontSize: 12,
          }}
        >
          { label }
        </Text>
      </View>
      <PaperTextInput
        {...oProps}
        mode="outlined"
        theme={paperTheme}
        render={renderInput(props, theme)}
      />
      {
        props.error && props.errorMessage && (
          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <Text
              style={{
                color: theme.colors.error,
                fontFamily: theme.fonts.regular,
                fontSize: 13,
              }}
            >
              { props.errorMessage }
            </Text>
          </View>
        )
      }
    </View>
  );
};
