import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from 'design-system';
import { TxHistoryRow } from '../../components';
import styled from 'styled-components/native';

const Container = styled(View)`
  margin: 20px;
`;

storiesOf('components', module)
  .add('TxHistoryRow', () => (
    <ScreenContainer>
      <Container>
        <TxHistoryRow
          tokenSymbol="eth"
          tokenDecimal={10}
          amount={0.0001}
          status="sent"
          time={Date.now()}
        />
        <TxHistoryRow
          tokenSymbol="eth"
          tokenDecimal={10}
          amount={0.0001}
          status="received"
          time={Date.now()}
        />
      </Container>
    </ScreenContainer>
  ));
