import React from 'react';
import { TokenBoxCarousel } from './TokenBoxCarousel';

export * from './TokenBoxCarousel';

const items = [{
  iconName: 'key',
  tokenName: "SelfKey",
  tokenCode: "key",
  tokenAmount: 0,
  fiatCurrency: "usd",
  fiatAmount: 0
}, {
  iconName: 'eth',
  tokenName: "Ethereum",
  tokenCode: "eth",
  tokenAmount: 0,
  fiatCurrency: "usd",
  fiatAmount: 0
}];

export function TokenBoxCarouselHOC() {
  
  return (
    <TokenBoxCarousel
      items={items}
    />
  )
}
