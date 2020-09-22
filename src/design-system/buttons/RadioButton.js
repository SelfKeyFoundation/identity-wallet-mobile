import styled from 'styled-components/native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

const RadioButtonWrapper = styled.View`
  width: 18px;
  height: 18px;
  border: 1px solid ${props => props.checked ? props.theme.colors.primary : props.theme.colors.disabled};
  border-radius: 100;
  align-items: center;
  justify-content: center;
  display: flex;
  background: ${props => props.hasError ? 'rgba(255,106,106,0.05)' : props.theme.colors.baseDark}
`;

const RadioButtonInner = styled.View`
  width: 6px;
  height: 6px;
  background:${props => props.theme.colors.primary};
  border-radius: 100;
`;

export function RadioButton(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onCheck}>
      <RadioButtonWrapper hasError={props.hasError} checked={props.checked}>
        {
          props.checked ? <RadioButtonInner /> : null
        }
      </RadioButtonWrapper>
    </TouchableWithoutFeedback>
  )
}