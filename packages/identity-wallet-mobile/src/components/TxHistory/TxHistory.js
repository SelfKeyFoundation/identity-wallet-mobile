
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
import { TouchableWithoutFeedback } from 'react-native';
import { TxHistoryRow } from '../';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 20px;
  font-family: ${props => props.theme.fonts.bold};
  margin: 15px;
`;

const TxGrid = styled(Grid)`
  border-radius: 4px;
  padding-bottom: 25px;
  flex-direction: column;
`;

const Container = styled.View`
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
`;

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
    <Container>
      <LinearGradient colors={['#2E3945', '#222B34']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
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
      </LinearGradient>
    </Container>
  )
}
