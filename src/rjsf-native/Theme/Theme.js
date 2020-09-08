import React from "react";
import { View, Text } from 'react-native';

// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import {
  Grid,
  Col,
  Row,
  Explanatory,
  Button
} from 'design-system';


import ArrayFieldTemplate from "../ArrayFieldTemplate";
import ErrorList from "../ErrorList";
import Fields from "../Fields";
import FieldTemplate from "../FieldTemplate";
import ObjectFieldTemplate from "../ObjectFieldTemplate";
import Widgets from "../Widgets";

import { ThemeProps } from "@rjsf/core";
import { utils } from "@rjsf/core";
const { getDefaultRegistry } = utils;

const { fields, widgets } = getDefaultRegistry();

const DefaultChildren = (props) => {
  return (
    <View>
      <Button>Submit</Button>
    </View>
  );
};

const Theme: ThemeProps = {
  children: <DefaultChildren />,
  ArrayFieldTemplate,
  fields: { ...fields, ...Fields },
  FieldTemplate,
  ObjectFieldTemplate,
  widgets: { ...widgets, ...Widgets },
  ErrorList,
};

export default Theme;
