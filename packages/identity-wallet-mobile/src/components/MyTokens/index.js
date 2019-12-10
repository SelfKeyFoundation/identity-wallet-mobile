import React from 'react';
import { useSelector } from 'react-redux';
import modules from '@selfkey/wallet-core/modules';
import { MyTokens } from './MyTokens';
export * from './MyTokens';

const { selectors } = modules.wallet;

export function MyTokensHOC() {
  const ethBalance = useSelector(selectors.getBalance);
  const tokens = useSelector(selectors.getTokens);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const tokensFiatAmount = useSelector(selectors.getTokensFiatAmount)
  const primaryToken = tokens[0];

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
    <MyTokens
      tokens={items}
      tokensFiatAmount={tokensFiatAmount}
      tokensFiatCurrency="usd"
    />
  )
}