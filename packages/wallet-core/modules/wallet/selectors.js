// @flow
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
export const getRoot = state => state.wallet;
export const getWallet = (state) => getRoot(state) || {};
export const getAddress = (state) => getWallet(state).address;
export const getBalance = (state) => getWallet(state).balance || 0;
export const getFiatAmount = (state) => {
  const prices = getTokenPrice('ETH');
  const balance = +getBalance(state);
  return balance * prices.priceUSD;
}

export const getTokensFiatAmount = (state) => {
  const ethAmount = getFiatAmount(state) || 0;
  const tokensAmount = getTokens(state).reduce((sum, token) => sum + token.balanceInFiat, 0) || 0;
  return (ethAmount + tokensAmount) || 0;
}

// TODO: Move to token utils
function getTokenName(symbol) {
  symbol = symbol.toLowerCase();

  if (symbol === 'ETH') {
    return 'Ethereum';
  }

  if (symbol === 'KI' || symbol === 'KEY') {
    return 'SelfKey';
  }

  return symbol.toUpperCase();
}

export const getTokens = (state) => getWallet(state).tokens || [];
export const getTokenDetails = (tokenId) => (state) => {
  if (tokenId === 'ETH') {
    return {
      name: getTokenName(tokenId),
      code: 'ETH',
      amount: getBalance(state),
      decimal: 18,
      lastPrice: getTokenPrice('ETH').priceUSD,
      lastPriceCurrency: 'usd',
      fiatCurrency: 'usd',
      fiatAmount: getFiatAmount(state),
      tokenContract: undefined 
    }
  }

  const tokens = getTokens(state);
  const token = tokens.find(t => t.symbol === tokenId);

  return {
    name: getTokenName(token.symbol),
    code: token.symbol,
    amount: token.balance,
    decimal: token.decimal,
    lastPrice: getTokenPrice(token.symbol).priceUSD,
    lastPriceCurrency: 'usd',
    fiatCurrency: 'usd',
    fiatAmount: token.balanceInFiat,
    tokenContract: token.contract
  }
}
