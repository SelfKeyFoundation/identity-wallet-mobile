
// @flow
import React from 'react';
import {
  SKIcon,
  Row,
  Col,
  FormattedNumber,
  Grid,
  Explanatory,
  Link
} from '@selfkey/mobile-ui';
import { TxHistoryRow } from '../';
import styled from 'styled-components/native';

const Container = styled.View`
  background: #2E3945;
  border-radius: 4px;
  padding: 40px 30px 50px 30px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
  align-items: center;
  flex-direction: column;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 20px;
  font-family: ${props => props.theme.fonts.bold};
  margin: 15px;
`;

const TxGrid = styled(Grid)`
  background: #2E3945;
  border-radius: 4px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
  flex-direction: column;
  padding-bottom: 25px;
`

const BorderRow = styled(Row)`
  border-bottom-width: 1px;
  border-color: #475768;
  padding: 5px 20px 10px 18px;
  margin: 0;
`;

const LoadMore = styled(Link)`
  text-transform: uppercase;
  font-size: 13px;
`;


export function TxHistory(props) {
  const { items = [] } = props;

  return (
    <TxGrid>
      <Row>
        <Col autoWidth>
          <Title>
            Transactions
          </Title>
        </Col>
      </Row>
      {
        props.items.map(item => {
          return (
            <BorderRow>
              <Col noPadding>
                <TxHistoryRow
                  tokenSymbol={item.tokenSymbol}
                  tokenDecimal={item.tokenDecimal}
                  amount={item.amount}
                  status={item.status}
                  time={item.time}
                />
              </Col>
            </BorderRow>
          );
        })
      }
      { props.showLoadMore && <Row justifyContent="center" marginTop={25}>
        <Col autoWidth marginTop={2}>
          <SKIcon name="icon-expand_arrow-1" color="#00C0D9" size={11.13} onPress={props.onLoadMore} />
        </Col>
        <Col autoWidth>
          <LoadMore onPress={props.onLoadMore}>
            Load More
          </LoadMore>
        </Col>
      </Row>}
    </TxGrid> 
  )
}
