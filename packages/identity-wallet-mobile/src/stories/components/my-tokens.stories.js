import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from '@selfkey/mobile-ui';
import { MyTokens, TokensEmptyAlert } from '../../components';
import styled from 'styled-components/native';

const Container = styled.View`
  margin: 20px;
`;

const tokens = [{
  id: '<key-id>',
  name: 'SelfKey',
  code: 'Key',
  amount: 0,
  fiatAmount: 0,
  fiatCurrency: 'usd',
  color: '#2DA1F8'
}, {
  id: '<eth-id>',
  name: 'Ethereum',
  code: 'Eth',
  amount: 0,
  fiatAmount: 0,
  fiatCurrency: 'usd',
  color: '#9418DC'
}]

storiesOf('components', module)
  .add('MyTokens', () => (
    <ScreenContainer>
      <Container>
        <MyTokens
          tokens={tokens}
          tokensFiatAmount={0}
          tokensFiatCurrency="usd"
        />
      </Container>
    </ScreenContainer>
  ));
