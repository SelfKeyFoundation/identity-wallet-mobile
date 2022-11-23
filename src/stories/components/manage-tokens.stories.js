import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from 'design-system';
import { ManageTokens, HideTokenModal } from '../../components';
import styled from 'styled-components/native';

const Container = styled(View)`
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
  id: '<eth-id-1>',
  name: 'Ethereum',
  code: 'Eth',
  amount: 0,
  fiatAmount: 0,
  fiatCurrency: 'usd',
  color: '#9418DC'
}, {
  id: '<eth-id-2>',
  name: 'Cordano',
  code: 'ADA',
  amount: 0,
  fiatAmount: 0,
  fiatCurrency: 'usd',
  color: '#9418DC'
}, {
  id: '<eth-id-3>',
  name: 'Augur',
  code: 'AUG',
  amount: 0,
  fiatAmount: 0,
  fiatCurrency: 'usd',
  color: '#9418DC'
}, {
  id: '<eth-id-4>',
  name: 'Golem',
  code: 'GTM',
  amount: 0,
  fiatAmount: 0,
  fiatCurrency: 'usd',
  color: '#9418DC'
}]

storiesOf('components', module)
  .add('ManageTokens', () => (
    <ScreenContainer>
      <Container>
        <ManageTokens
          tokens={tokens}
          onAdd={console.log}
          onRemove={console.log}
          tokensFiatAmount={0}
          tokensFiatCurrency="usd"
        />
      </Container>
    </ScreenContainer>
  ))
  .add('Hide modal', () => (
    <ScreenContainer>
      <HideTokenModal visible={true} />
    </ScreenContainer>
  ));
