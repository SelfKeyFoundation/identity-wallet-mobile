import React from 'react';

import { FieldProps } from '@selfkey/rjsf-core';

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
  FormLabel,
  TextInput,
  H3,
  FormattedNumber,
} from '@selfkey/mobile-ui';
// const useStyles = makeStyles({
//   root: {
//     marginTop: 5,
//   },
// });

const DescriptionField = ({ description }: FieldProps) => {
  if (description) {
    // const classes = useStyles();

    return (
      <FormLabel>
        {description}
      </FormLabel>
    );
  }

  return null;
};

export default DescriptionField;
