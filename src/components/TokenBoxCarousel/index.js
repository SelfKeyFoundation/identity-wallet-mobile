import React from 'react';
import { useSelector } from 'react-redux';
import modules from 'core/modules';
import { TokenBoxCarousel } from './TokenBoxCarousel';
import { IconKey, IconEth, IconTokens } from 'design-system/svg-icons';

export * from './TokenBoxCarousel';

const { selectors } = modules.wallet;

export function TokenBoxCarouselContainer() {
  const ethBalance = useSelector(selectors.getBalance);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const tokens = useSelector(selectors.getTokens);
  const network = useSelector(modules.app.selectors.getNetwork);
  const mainToken = tokens[0] || {};

  const items = [];
  
  if (network.symbol === 'ETH') {
    items.push(...[
      {
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
      }
    ])
  }
  
  if (network.symbol === 'BNB') {
    items.push({
      iconName: 'bnb',
      tokenName: "Binance Coin",
      tokenCode: "BNB",
      tokenAmount: ethBalance,
      // TODO: Get currency from user settings
      fiatCurrency: "usd",
      fiatAmount: fiatAmount
    })
  }
  
  
  items.push({
    tokenCode: 'custom',
    tokenName: 'Custom Tokens',
    iconName: 'tokens'
  })

  return (
    <TokenBoxCarousel
      items={items}
    />
  )
}
