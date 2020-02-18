import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Picker } from 'react-native';
import styled from 'styled-components/native';
import {
  SKIcon,
  Row,
  Col,
  Grid,
  Button,
  TextInput,
  H3,
  Paragraph,
  ThemeContext,
  ErrorMessage,
  Link,
} from '@selfkey/mobile-ui';
import RNPickerSelect from 'react-native-picker-select';

const SelectInput = styled.View`
  background: ${ props => props.hasError ? 'rgba(255,106,106,0.05)' : '#1B2229'};
  color: ${ props => props.hasError ? props.theme.colors.error : props.theme.colors.typography};
  border: 1px solid ${ props => props.hasError ? props.theme.colors.error : '#485A6E'};
  padding: 12px 15px;
  border-radius: 4px;
`;

const SelectText = styled.Text`
  color: ${props => props.selectedItem ? 'white' : '#697C95'};
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

const SelectIcon = styled.View`
  position: absolute;
  right: 15px;
  top: 15px;
`;

// TODO: Move to the Design System package
export function SelectBox(props) {
  const selectedItem = useMemo(() => {
    return props.items.find(item => item.value === props.selectedValue);
  }, [props.items, props.selectedValue]);

  const items = useMemo(() => {
    return props.items.map(item => ({
      ...item,
      color: 'black',
    }));
  }, [props.items]);

  return (
    <View>
      <FormLabel>{props.label}</FormLabel>
      <RNPickerSelect
        items={items}
        onValueChange={props.onValueChange}
        selectedValue={props.selectedValue}
      >
        <SelectInput hasError={props.error}>
          <SelectIcon>
            <SKIcon name="icon-expand_arrow-1" size={12} color="rgba(147,176,193,0.5)" />
          </SelectIcon>
          <SelectText selectedItem={selectedItem}>
            {
              selectedItem ? selectedItem.label : props.placeholder
            }
          </SelectText>
        </SelectInput>
      </RNPickerSelect>
      {
        (props.error && props.errorMessage) ? (
          <View style={{ marginBottom: 5, marginTop: 10 }}>
            <ErrorMessage>
              { props.errorMessage }
            </ErrorMessage>
          </View>
        ) : null
      }
    </View>
  )
}