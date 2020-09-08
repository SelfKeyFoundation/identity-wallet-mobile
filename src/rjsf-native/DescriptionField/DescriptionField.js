import React from 'react';

import { FieldProps } from '@rjsf/core';
import { Text } from 'react-native';
import styled from 'styled-components/native';
// import { makeStyles } from '@material-ui/styles';
// import Typography from '@material-ui/core/Typography';
import {
  ScreenContainer,
  Modal,
  Button,
  SKIcon,
  Grid,
  Col,
  Row,
  Alert,
  ThemeContext,
  Paragraph,
  Explanatory,
  Link,
  DefinitionTitle,
  ExplanatorySmall,
  TextInput,
  H3,
  FormattedNumber,
} from 'design-system';
// const useStyles = makeStyles({
//   root: {
//     marginTop: 5,
//   },
// });
export const FormLabel = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
`;


const DescriptionField = ({ description }: FieldProps) => {
  if (description) {
    return (
      <FormLabel>{ description }</FormLabel>
    );
  }

  return null;
};

export default DescriptionField;
