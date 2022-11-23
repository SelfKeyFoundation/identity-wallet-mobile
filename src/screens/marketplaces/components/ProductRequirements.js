/**
 * @flow
 */

import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import {
  Typography
} from 'design-system';
import { RequirementsList } from './RequirementsList';

type ProductRequirementsProps = {
  
}

const Box = styled(View)`
  margin: 30px 21px;
`;

export function ProductRequirements(props: ProductOverviewProps) {
  return (
    <Box style={props.style}>
      <Typography fontWeight="bold" fontSize={24} lineHeight={30} marginBottom={20}>
        Requirements
      </Typography>
      {
        props.children
      }
      <RequirementsList requirements={props.requirements}/>
    </Box>
  );
}
