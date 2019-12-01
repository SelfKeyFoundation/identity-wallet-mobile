import React from 'react';
import { MyTokens } from './MyTokens';
export * from './MyTokens';

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

export function MyTokensHOC() {

  return (
    <MyTokens
      tokens={tokens}
    />
  )
}