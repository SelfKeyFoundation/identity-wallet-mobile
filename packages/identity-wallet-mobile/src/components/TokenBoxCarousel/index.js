import React from 'react';
import { useSelector } from 'react-redux';
import modules from '@selfkey/wallet-core/modules';
import { TokenBoxCarousel } from './TokenBoxCarousel';

export * from './TokenBoxCarousel';

const { selectors } = modules.wallet;

export function TokenBoxCarouselHOC() {
  const ethBalance = useSelector(selectors.getBalance);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const tokens = useSelector(selectors.getTokens);

  const items = [{
    iconName: 'key',
    tokenName: "SelfKey",
    tokenCode: tokens[0].symbol,
    tokenAmount: tokens[0].balance,
    // TODO: Get currency from user settings
    fiatCurrency: "usd",
    fiatAmount: tokens[0].balanceInFiat
  }, {
    iconName: 'eth',
    tokenName: "Ethereum",
    tokenCode: "eth",
    tokenAmount: ethBalance,
    // TODO: Get currency from user settings
    fiatCurrency: "usd",
    fiatAmount: fiatAmount
  }];

  return (
    <TokenBoxCarousel
      items={items}
    />
  )
}
