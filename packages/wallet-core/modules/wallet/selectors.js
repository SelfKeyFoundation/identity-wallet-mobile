// @flow
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
export const getRoot = state => state.wallet;
export const getWallet = (state) => getRoot(state).wallet || {};
export const getAddress = (state) => getWallet(state).address;
export const getBalance = (state) => getWallet(state).balance;
export const getFiatAmount = (state) => {
  const prices = getTokenPrice('ETH');
  const balance = +getBalance(state);
  return balance * prices.priceUSD;
}

export const getTokensFiatAmount = (state) => {
  const ethAmount = getFiatAmount(state);
  const tokensAmount = getTokens(state).reduce((sum, token) => sum + token.balanceInFiat, 0);
  return ethAmount + tokensAmount;
}

export const getTokens = (state) => getWallet(state).tokens || [];
