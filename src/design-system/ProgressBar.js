import React, { useRef, useContext } from 'react';
import RNDatePicker from 'react-native-datepicker';
import styled from 'styled-components/native';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useDarkMode } from 'react-native-dark-mode';
import { SKIcon } from './icons';
import { Row, Col } from './grid';
import { ThemeContext } from './mobile-ui-provider';
import { Paragraph, FormPlaceholder } from './typography';

const FormInputContainer = styled.View`

`;

const InputContainer = styled.View`
  background: ${ props => props.hasError ? 'rgba(255,106,106,0.05)' : '#1B2229'};
  color: ${ props => props.hasError ? props.theme.colors.error : props.theme.colors.typography};
  border: 1px solid ${ props => props.hasError ? props.theme.colors.error : '#485A6E'};
  padding: 0px 15px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
`;

const ProgressIndicator = styled.View`
  width: ${props => `${(props.value || 0) * 100}%`};
  position: absolute;
  background: #697C95;
  height: 50px;
  left: 0;
  bottom: 0;
  border-radius: 8px;
`;

const SelectText = styled.Text`
  color: ${props => props.value ? 'white' : '#697C95'};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 21px;
`;

const FormLabel = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 12px;
  font-family: ${props => props.theme.fonts.bold};
  text-transform: uppercase;
  margin-bottom: 10px;
`;




export function ProgressBar(props) {
  

  return (
    <FormInputContainer>
      <FormLabel>{props.label}</FormLabel>
      <InputContainer>
        <FormPlaceholder>{props.children}</FormPlaceholder> 
      </InputContainer>
        <ProgressIndicator value={props.value} />
    </FormInputContainer>
  )
}