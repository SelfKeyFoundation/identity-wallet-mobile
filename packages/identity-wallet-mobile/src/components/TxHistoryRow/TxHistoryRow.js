
// @flow
import React from 'react';
import {
  SKIcon,
  Row,
  Col,
  FormattedNumber,
  Grid,
  Explanatory
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

import dateFormat from 'dateformat';

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
  font-family: ${props => props.theme.fonts.bold};
`;

const Amount = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-family: ${props => props.theme.fonts.bold};
`;

const statusDescriptionMap = {
  sent: 'Sent',
  received: 'Received',
  sending: 'Sending',
  receiving: 'Receiving'
}

const statusIconMap = {
  sent: 'icon-sent',
  received: 'icon-receive',
  sending: 'icon-hourglass',
  receiving: 'icon-hourglass'
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
  const tokenSymbol = tokenSymbol && props.tokenSymbol.toUpperCase();
  const date = getFormattedDate(props.timeStamp);

  return (
    <Grid>
      <Row>
        <IconCol autoWidth>
          <SKIcon name={statusIconMap[props.status]} color="#697C95" size={18} />
        </IconCol>
        <Col>
          <Description>{statusDescriptionMap[props.status]} {tokenSymbol}</Description>
          <DateText>{date}</DateText>
        </Col>
        <Col autoWidth>
          <Row>
            <Col noPadding>
              <Amount>
                {statusPrefixMap[props.status]}{' '}
                <FormattedNumber value={props.amount} decimal={props.tokenDecimal}/>
              </Amount>
            </Col>
            <Col autoWidth noPadding paddingTop={2} paddingLeft={5}>
              <Explanatory>{tokenSymbol}</Explanatory>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid> 
  )
}
