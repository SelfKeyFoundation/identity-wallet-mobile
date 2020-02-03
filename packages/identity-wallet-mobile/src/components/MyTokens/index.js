import React, { useState, useCallback } from 'react';
import  { View } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { TokensEmptyAlert } from '../TokensEmptyAlert'
import modules from '@selfkey/wallet-core/modules';
import { MyTokens } from './MyTokens';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
export * from './MyTokens';

const { selectors } = modules.wallet;

const TokensContainer = styled.View`
  margin-bottom: 15px;
`;

const EmptyTokensContainer = styled.View`
  margin-bottom: 25px;
`;

export function MyTokensContainer() {
  const ethBalance = useSelector(selectors.getBalance);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const [viewAll, setViewAll] = useState(false);
  const tokensFiatAmount = useSelector(selectors.getTokensFiatAmount);
  const allTokens = useSelector(selectors.getTokens);
  const customTokens = useSelector(selectors.getCustomTokens);
  const primaryToken = allTokens[0] || {};
  const isEmpty = customTokens.length === 0;
  const handleManage = useCallback(() => {
    navigate(Routes.APP_MY_TOKENS);
  }, []);

  const handleViewAll = useCallback(() => {
    setViewAll(true);
  }, []);

  const defaultTokens = [{
      id: primaryToken.id,
      iconName: 'key',
      name: "SelfKey",
      symbol: primaryToken.symbol,
      amount: primaryToken.balance,
      fiatCurrency: "usd",
      fiatAmount: primaryToken.balanceInFiat,
      color: '#2DA1F8'
    }, {
      id: 'eth',
      iconName: 'eth',
      name: "Ethereum",
      symbol: "eth",
      amount: ethBalance,
      fiatCurrency: "usd",
      fiatAmount: fiatAmount,
      color: '#9418DC'
    },
  ];

  const tokens = customTokens.length ? customTokens : defaultTokens;

  return (
    <View>
      <TokensContainer>
        <MyTokens
          tokens={viewAll ? tokens : tokens.slice(0, 3)}
          tokensFiatAmount={tokensFiatAmount}
          tokensFiatCurrency="usd"
          showViewAll={!viewAll && customTokens.length > 3}
          onViewAll={handleViewAll}
          onManage={handleManage}
        />
      </TokensContainer>
      {isEmpty && (
        <EmptyTokensContainer>
          <TokensEmptyAlert>
            Hit the ”Manage” button above to add ERC-20 tokens, or safely store KEY and ETH by sending it to your wallet.
          </TokensEmptyAlert>
        </EmptyTokensContainer>
      )}
    </View>
  )
}