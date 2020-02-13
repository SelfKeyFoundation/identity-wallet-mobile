import React from 'react';
import { useSelector } from 'react-redux';
import modules from '@selfkey/wallet-core/modules';
import { TokenBoxCarousel } from './TokenBoxCarousel';

export * from './TokenBoxCarousel';

const { selectors } = modules.wallet;

export function TokenBoxCarouselContainer() {
  const ethBalance = useSelector(selectors.getBalance);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const tokens = useSelector(selectors.getTokens);

  const mainToken = tokens[0] || {};

  const items = [{
    iconName: 'key',
    tokenName: "SelfKey",
    tokenCode: mainToken.symbol,
    tokenAmount: mainToken.balance,
    // TODO: Get currency from user settings
    fiatCurrency: "usd",
    fiatAmount: mainToken.balanceInFiat
  }, {
    iconName: 'eth',
    tokenName: "Ethereum",
    tokenCode: "ETH",
    tokenAmount: ethBalance,
    // TODO: Get currency from user settings
    fiatCurrency: "usd",
    fiatAmount: fiatAmount
  }, {
    tokenCode: 'custom',
    tokenName: 'Custom Tokens',
    iconName: 'tokens'
  }];

  return (
    <TokenBoxCarousel
      items={items}
    />
  )
}
