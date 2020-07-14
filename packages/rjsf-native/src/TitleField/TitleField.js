import React from 'react';

import { FieldProps } from '@selfkey/rjsf-core';

// import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
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

const TitleField = ({ title }: FieldProps) => (
  <React.Fragment>
    {
      // <Box mb={1} mt={1}>
      //   <Typography variant="h5">{title}</Typography>
      //   <Divider />
      // </Box>
    }
    <DefinitionTitle>{title}</DefinitionTitle>
  </React.Fragment>
);

export default TitleField;
