// @flow
import React, { useContext } from 'react';
import {
  Text,
} from 'react-native-paper';

import SKTextInput from './SKTextInput';
import { Row, Col } from '../grid';
import styled from 'styled-components/native';
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from 'react-native';

import { PaperThemeContext, ThemeContext } from '../mobile-ui-provider';

const IconContainer = styled.View`
  position: absolute;
  right: 13px;
  top: 13px;
  z-index: 99999;
`;

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
    paddingRight: inputProps.icon ? 35 : 17,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
  });

  return (
    <NativeTextInput
      {...props}
      autoCorrect={false}
      autoCapitalize="none"
      autoComplete="off"
      style={style}
    />
  );
};

export const TextInput = (props: TextInputProps) => {
  const paperTheme = useContext(PaperThemeContext);
  const theme = useContext(ThemeContext);
  const { label, ...oProps} = props;


  return (
    <View>
      <Row style={{ marginBottom: 10, marginTop: 10, marginLeft: 0, marginRight: 0 }}>
        <Col noPadding autoWidth>
          <Text
            style={[{
              color: props.disabled ? theme.colors.disabled : theme.colors.typography,
              textTransform: 'uppercase',
              fontFamily: theme.fonts.bold,
              fontSize: 12,
            }, props.labelStyle]}
          >
            { label }
          </Text>
        </Col>
        { props.required ? <Col noPadding>
          {
            <Text style={{
              color: props.disabled ? theme.colors.disabled : theme.colors.typography,
              textTransform: 'uppercase',
              fontFamily: theme.fonts.bold,
              fontSize: 12,
            }}>*</Text>
          }
        </Col> : null }
      </Row>
      <View>
        <SKTextInput
          {...oProps}
          mode="outlined"
          theme={paperTheme}
          render={renderInput(props, theme)}
        />
        {
          props.icon && (
            <IconContainer>
              { props.icon }
            </IconContainer>
          )
        }
      </View>
      {
        (props.error && props.errorMessage) ? (
          <View style={{ marginBottom: 5, marginTop: 10 }}>
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
        ) : null
      }
      {
        props.feedback ? props.feedback : null
      }
    </View>
  );
};
