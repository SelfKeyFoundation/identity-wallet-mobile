import styled from 'styled-components/native';
import React, { useContext } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { SKIcon } from 'design-system/icons';
import { PaperThemeContext, ThemeContext } from '../mobile-ui-provider';

const CheckboxWrapper = styled(View)`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ hasError, theme, checked }) => checked ? theme.colors.primary : (hasError ? theme.colors.error : theme.colors.disabled)};
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 3px;
  background: ${props => props.hasError ? 'rgba(255,106,106,0.05)' : props.theme.colors.baseDark}
`;

// const RadioButtonInner = styled(View)`
//   width: 6px;
//   height: 6px;
//   background:${props => props.theme.colors.primary};
//   border-radius: 100;
// `;

export function Checkbox(props) {
  const theme = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={props.onCheck}>
      <CheckboxWrapper hasError={props.hasError} checked={props.checked}>
        {
          props.checked ? (
            <SKIcon
              name="icon-check-bold"
              color={props.hasError ? theme.colors.error : theme.colors.primary}
              size={7}
            />
          ) : null
        }
      </CheckboxWrapper>
    </TouchableWithoutFeedback>
  )
}