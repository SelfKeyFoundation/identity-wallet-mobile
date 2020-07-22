import React, { useRef } from 'react';
import RNDatePicker from 'react-native-datepicker';
import styled from 'styled-components/native';
import { View, TouchableWithoutFeedback } from 'react-native';
import { SKIcon } from './icons';
import { Row, Col } from './grid';

const FormInputContainer = styled.View`

`;

const InputContainer = styled.View`
  background: ${ props => props.hasError ? 'rgba(255,106,106,0.05)' : '#1B2229'};
  color: ${ props => props.hasError ? props.theme.colors.error : props.theme.colors.typography};
  border: 1px solid ${ props => props.hasError ? props.theme.colors.error : '#485A6E'};
  padding: 12px 15px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InputItem = styled.View`
 
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

export function DatePicker(props) {
  const inputRef = useRef();

  const handlePress = () => {
    if (!inputRef || !inputRef.current) {
      return;
    }

    inputRef.current.onPressDate();
  }

  const handleChange = (value) => {
    const [day, month, year] = value.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    props.onChange(`${year}-${month}-${day}`);
  }

  let value = props.value;

  if (value) {
    const [year, month, day] = value.split('-');
    if (day && month && year) {
      value = `${day}-${month}-${year}`;
    }
  }

  return (
    <FormInputContainer>
      <FormLabel>{props.label}{props.required ? '*' : ''}</FormLabel>
      <TouchableWithoutFeedback onPress={handlePress}>
      <InputContainer>
        <InputItem style={{ flex: 1 }}>
          <RNDatePicker
            date={value}
            mode="date"
            placeholder="DD/MM/YYYY"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            ref={inputRef}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-start',
                height: 34,
                flex: 1,
              },
              dateTouchBody: {
                height: 34,
                flex: 1,
              },
              dateTouch: {
                width: '100%'
              },
              dateText: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Lato-Regular'
              }
            }}
            onDateChange={handleChange}
          />
        </InputItem>
        <InputItem>
          <SKIcon
            name="icon-calendar"
            size={20}
            color="#00C0D9"
          />
        </InputItem>
      </InputContainer>
      </TouchableWithoutFeedback>
    </FormInputContainer>
  )
}