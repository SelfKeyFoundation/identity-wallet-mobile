/**
 * @flow
 */

import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import {
  Col,
  Grid,
  Row,
  Typography
} from 'design-system';
import credentialIcon from './icons/assets/credentials.png';
import LinearGradient from 'react-native-linear-gradient';

const Box = styled.View`
  border: 0px solid ${props => props.noBorder ? 'transparent' : props.color || '#2DA1F8'};
  border-bottom-width: ${props => props.noBorder ? '1px' : '8px'};
  border-right-width: 1px;
  border-right-color: transparent;
  border-radius: 4px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
`;

const Line = styled.View`
  background: #475768;
  height: 1px;
`;

type MarketplaceItemProps = {
  onPress: Function,
}

export function MarketplaceItem(props: MarketplaceItemProps) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>  
      <Box style={props.style}>
        <LinearGradient
          colors={['#161A1F', '#1A2836']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            borderRadius: 4,
          }}
        >  
          <Grid style={{ padding: 15, paddingBottom: 0 }}>
            <Row alignItems="center" marginBottom={20}>
              <Col autoWidth>
                {/* <Image
                  source={credentialIcon}
                  style={{
                    width: 94 * 0.5,
                    height: 117 * 0.5,
                    marginBottom: 20
                  }} */}
                { props.iconComponent && <props.iconComponent /> }
                
              </Col>
              <Col paddingLeft={15}>
                <Typography fontWeight="bold" fontSize={18} lineHeight={30} marginBottom={6}>
                  {props.title}
                </Typography>
              </Col>
            </Row>
          </Grid>
          <Line />
          <Grid style={{ padding: 15 }}>
            <Row>
              <Col>
                <Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8">
                  {props.description}
                </Typography>
              </Col>
            </Row>
          </Grid>
        </LinearGradient>
      </Box>
    </TouchableWithoutFeedback>
  );
}
