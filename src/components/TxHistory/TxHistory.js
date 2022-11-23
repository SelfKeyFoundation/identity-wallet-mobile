
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
} from 'design-system';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { TxHistoryRow } from '../';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const Title = styled(Text)`
  color: ${props => props.theme.colors.white};
  font-size: 20px;
  font-family: ${({ font = 'bold', theme }) => theme.fonts[font]};
  margin-bottom: 10px;
`;

const TxGrid = styled(Grid)`
  border-radius: 4px;
  padding-bottom: 25px;
  flex-direction: column;
`;

const Container = styled(View)`
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
  padding: 18px 24px;
  border: 1px solid #303C49;
  border-radius: 4px;
`;

const BorderRow = styled(Row)`
  border-bottom-width: 1px;
  border-color: #475768;
  padding: 5px 0px 5px 0px;
  margin: 0;
  margin-top: 10px;
`;

const LoadMore = styled(Link)`
  text-transform: uppercase;
  font-size: 12px;
  color: #93B0C1;
`;


export function TxHistory(props) {
  const { items = [] } = props;

  return (
    <LinearGradient colors={['#161A1F', '#1A2836']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
    <Container>
     
        <TxGrid>
          <Row>
            <Col autoWidth>
              <Title font="regular">
                Transactions
              </Title>
            </Col>
          </Row>
          {
            props.items.map(item => {
              return (
                <BorderRow>
                  <TouchableWithoutFeedback onPress={() => props.onItemPress(item)}>
                    <Col noPadding>
                      <TxHistoryRow
                        tokenSymbol={item.tokenSymbol}
                        tokenDecimal={item.tokenDecimal}
                        amount={item.amount}
                        status={item.status}
                        timeStamp={item.timeStamp}
                      />
                    </Col>
                  </TouchableWithoutFeedback>
                </BorderRow>
              );
            })
          }
          { props.showLoadMore && <Row justifyContent="center" marginTop={25}>
            <Col autoWidth>
              <LoadMore onPress={props.onLoadMore}>
                View all Transactions
              </LoadMore>
            </Col>
          </Row>}
        </TxGrid> 
    </Container>
    </LinearGradient>
  )
}
