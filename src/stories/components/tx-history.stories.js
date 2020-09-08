import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from 'design-system';
import { TxHistoryHOC } from '../../components';
import styled from 'styled-components/native';
import { reduxMockDecorator } from 'core/utils/storybook-utils';
const Container = styled.View`
  margin: 20px;
`;

storiesOf('components', module)
  .addDecorator(reduxMockDecorator({
    txHistory: {
      transactions: [{
        hash: 'some-hash',
        value: 0.0001,
        timeStamp: Date.now(),
        status: 'sending',
        tokenSymbol: 'eth',
        tokenDecimal: 10,
      }, {
        hash: 'some-hash',
        value: 0.0001,
        timeStamp: Date.now(),
        status: 'sending',
        tokenSymbol: 'eth',
        tokenDecimal: 10,

      }, {
        hash: 'some-hash',
        value: 0.0001,
        timeStamp: Date.now(),
        status: 'sending',
        tokenSymbol: 'eth',
        tokenDecimal: 10,

      }, {
        hash: 'some-hash',
        value: 0.0001,
        timeStamp: Date.now(),
        status: 'sending',
        tokenSymbol: 'eth',
        tokenDecimal: 10,

      }, {
        hash: 'some-hash',
        value: 0.0001,
        timeStamp: Date.now(),
        status: 'sending',
        tokenSymbol: 'eth',
        tokenDecimal: 10,

      }, {
        hash: 'some-hash',
        value: 0.0001,
        timeStamp: Date.now(),
        status: 'sending',
        tokenSymbol: 'eth',
        tokenDecimal: 10,

      }],
    }
  }))
  .add('TxHistory', () => (
    <ScreenContainer>
      <Container>
        <TxHistoryHOC
          showLoadMore={true}
          onLoadMore={() => console.log('Load more')}
          items={[{
            tokenSymbol: "eth",
            tokenDecimal: 10,
            amount: '0.0001',
            status: 'sent',
            time: Date.now(),
          }, {
            tokenSymbol: "key",
            tokenDecimal: 10,
            amount: '0.0001',
            status: 'received',
            time: Date.now(),
          }, {
            tokenSymbol: "eth",
            tokenDecimal: 10,
            amount: '0.0001',
            status: 'sending',
            time: Date.now(),
          }]}
        />
      </Container>
    </ScreenContainer>
  ));
