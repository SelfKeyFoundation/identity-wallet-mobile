import React from 'react';
import { FieldProps } from '@rjsf/core/src';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const FormLabel = styled(Text)`
  color: ${props => props.theme.colors.typography};
  font-size: 12px;  
  font-family: ${props => props.theme.fonts.bold};
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const TitleField = ({ title }: FieldProps) => (
  <React.Fragment>
    {
      // <Box mb={1} mt={1}>
      //   <Typography variant="h5">{title}</Typography>
      //   <Divider />
      // </Box>
    }
    <FormLabel>{title}</FormLabel>
  </React.Fragment>
);

export default TitleField;
