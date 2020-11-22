/**
 * @flow
 */

import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import {
  Typography
} from 'design-system';

type ProductOverviewProps = {
  
}

const Box = styled.View`
  margin: 30px 21px;
`;

export function ProductOverview(props: ProductOverviewProps) {
  return (
    <Box style={props.style}>
      <Typography fontWeight="bold" fontSize={24} lineHeight={30} marginBottom={20}>
        About
      </Typography>
      <Typography lineHeight={24} fontSize={16}>
        Founded in 2013 by investment bankers, Gatecoin is a bitcoin and ethereum token exchange designed for both professional traders and retail investors. Through our intuitive trading platform, we enable individuals and institutions around the world to trade and invest in a wide variety of cryptocurrencies and blockchain assets.
      </Typography>
    </Box>
  );
}
