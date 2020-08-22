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

let fileViewer = () => {};

export const setFileViewer = (viewer) => {
  fileViewer = viewer;
}

export const viewFile = (filePath) => {
  fileViewer(filePath);
}

const getFormView = (parentProps) => (props) => {
  const formProps = {
    ...props,
    onSubmit: () => {
      const target = {
        blur() {}
      };

      props.onSubmit({
        preventDefault() {},
        persist() {},
        target: target,
        currentTarget: target,
      })
    }
  }

  return (
    <View>
      { props.children }
      { parentProps.children ? parentProps.children(formProps) : (
        <Button onPress={formProps.onSubmit}>
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
