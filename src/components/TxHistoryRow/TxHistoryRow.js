
// @flow
import React from 'react';
import {
  SKIcon,
  Row,
  Col,
  FormattedNumber,
  Grid,
  Explanatory
} from 'design-system';
import styled from 'styled-components/native';

import dateFormat from 'dateformat';
import { Image, View } from 'react-native';
import IconSent from './icon-sent.png';
import IconReceived from './icon-received.png';
import IconPending from './icon-pending.png';

const Container = styled.View`
  background: #2E3945;
  border-radius: 4px;
  padding: 40px 30px 50px 30px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
  align-items: center;
  flex-direction: column;
`;

const IconCol = styled(Col)`
  width: 35px;
`

const DateText = styled(Explanatory)`
  padding-top: 5px;
`;

// const Title = styled.Text`
//   color: ${({ theme }) => theme.colors.white };
//   font-size: 16px;
//   font-family: ${props => props.theme.fonts.bold};
//   margin-top: 10px;
//   line-height: 24px;
//   text-align: center;
// `;

const Description = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-family: ${props => props.theme.fonts.regular};
`;

const Amount = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-family: ${props => props.theme.fonts.regular};
`;

const statusDescriptionMap = {
  sent: 'Sent',
  received: 'Received',
  sending: 'Sending',
  receiving: 'Receiving'
}

const statusIconMap = {
  // sent: 'icon-sent',
  sent: () => {
    
    return <Image source={IconSent} />;
  },
  // received: 'icon-receive',
  received: () => {
    
    return <Image source={IconReceived} />;
  },
  // sending: 'icon-hourglass',
  sending: () => {
    
    return <Image source={IconPending} />;
  },
  // receiving: 'icon-hourglass'
  receiving: () => {
    
    return <Image source={IconPending} />;
  },
}

const statusPrefixMap = {
  sent: '-',
  received: '+',
  sending: '-',
  receiving: '+',

}

function getFormattedDate(time) {
  if (!time) {
    return '';
  }

  return dateFormat(time, 'dd mmm yyyy');
}

export function TxHistoryRow(props) {
  const tokenSymbol = props.tokenSymbol && props.tokenSymbol.toUpperCase();
  const date = getFormattedDate(props.timeStamp);
  const IconComponent = statusIconMap[props.status];

  return (
    <Grid>
      <Row justifyContent="center" alignItems="center">
        <IconCol autoWidth>
          {/* <SKIcon name={statusIconMap[props.status]} color="#697C95" size={18} /> */}
          <IconComponent />
        </IconCol>
        <Col style={{ paddingLeft: 18 }}>
          <Description>{statusDescriptionMap[props.status]} {tokenSymbol}</Description>
          <DateText>{date}</DateText>
        </Col>
        <Col autoWidth>
          <Row>
            <Col>
              <Amount>
                {statusPrefixMap[props.status]}{''}
                <FormattedNumber value={props.amount} decimal={props.tokenDecimal}/>
              </Amount>
            </Col>
            {/* <Col autoWidth noPadding paddingTop={2} paddingLeft={5}>
              <Explanatory>{tokenSymbol}</Explanatory>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </Grid> 
  )
}
