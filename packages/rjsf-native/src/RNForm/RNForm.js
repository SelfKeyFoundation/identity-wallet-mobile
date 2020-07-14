// @flow
import React from 'react';
import { withTheme, FormProps } from '@selfkey/rjsf-core';
import { View } from 'react-native';
import Theme from '../Theme';
import { StatelessComponent } from 'react';
import {
  Grid,
  Col,
  Row,
  Explanatory,
  Button
} from '@selfkey/mobile-ui';

const RNForm: React.ComponentClass<FormProps<any>> | StatelessComponent<FormProps<any>>  = withTheme(Theme);

const getFormView = (parentProps) => (props) => {  
  return (
    <View>
      { props.children }
      { parentProps.children ? parentProps.children(props) : (
        <Button onPress={(event) => {
          const target = {
            blur() {

            }
          };

          props.onSubmit({
            preventDefault() {},
            persist() {},
            target: target,
            currentTarget: target,
          })
        }}>
          Submit
        </Button>
      )}
    </View>
  )
}

export default (props) => {
  const FormView = getFormView(props);
  return (
    <RNForm
      {...props}
      tagName={FormView}
    >
      <React.Fragment />
    </RNForm>
  );
};
