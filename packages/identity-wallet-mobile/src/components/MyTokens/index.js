import React from 'react';
import  { View } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { TokensEmptyAlert } from '../TokensEmptyAlert'
import modules from '@selfkey/wallet-core/modules';
import { MyTokens } from './MyTokens';
export * from './MyTokens';

const { selectors } = modules.wallet;

const TokensContainer = styled.View`
  margin-bottom: 15px;
`;

const EmptyTokensContainer = styled.View`
  margin-bottom: 25px;
`;

export function MyTokensHOC() {
  const ethBalance = useSelector(selectors.getBalance);
  const tokens = useSelector(selectors.getTokens);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const tokensFiatAmount = useSelector(selectors.getTokensFiatAmount)
  const primaryToken = tokens[0] || {};
  // Exclude the primary token, KEY or KI
  const isEmpty = tokens.length === 1;

  const items = [{
    id: primaryToken.id,
    iconName: 'key',
    name: "SelfKey",
    code: primaryToken.symbol,
    amount: primaryToken.balance,
    fiatCurrency: "usd",
    fiatAmount: primaryToken.balanceInFiat,
    color: '#2DA1F8'
  }, {
    id: 'eth',
    iconName: 'eth',
    name: "Ethereum",
    code: "eth",
    amount: ethBalance,
    fiatCurrency: "usd",
    fiatAmount: fiatAmount,
    color: '#9418DC'
  }];

  return (
    <View>
      <TokensContainer>
        <MyTokens
          tokens={items}
          tokensFiatAmount={tokensFiatAmount}
          tokensFiatCurrency="usd"
        />
      </TokensContainer>
      {isEmpty && (
        <EmptyTokensContainer>
          <TokensEmptyAlert />
        </EmptyTokensContainer>
      )}
    </View>
  )
}