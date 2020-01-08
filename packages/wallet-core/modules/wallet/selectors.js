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
function getTokenName(symbol = 'eth') {
  symbol = symbol.toUpperCase();

  if (symbol === 'ETH') {
    return 'Ethereum';
  }

  if (symbol === 'KI' || symbol === 'KEY') {
    return 'SelfKey';
  }

  return symbol;
}

export const getTokens = (state) => getWallet(state).tokens || [];
export const getTokenDetails = (symbol = 'eth') => (state) => {
  symbol = symbol.toUpperCase();

  if (symbol === 'ETH') {
    return {
      name: getTokenName(symbol),
      // TODO: Remove this property 'code'
      code: 'ETH',
      symbol: 'ETH',
      amount: getBalance(state),
      decimal: 18,
      lastPrice: getTokenPrice('ETH').priceUSD,
      lastPriceCurrency: 'usd',
      fiatCurrency: 'usd',
      fiatAmount: getFiatAmount(state),
      contractAddress: undefined 
    }
  }

  const tokens = getTokens(state);
  const token = tokens.find(t => t.symbol && t.symbol.toUpperCase() === symbol);

  return {
    name: getTokenName(token.symbol),
    // TODO: Remove this property 'code'
    code: token.symbol,
    symbol: token.symbol,
    amount: token.balance,
    decimal: token.decimal,
    lastPrice: getTokenPrice(token.symbol).priceUSD,
    lastPriceCurrency: 'usd',
    fiatCurrency: 'usd',
    fiatAmount: token.balanceInFiat,
    contractAddress: token.address
  }
}
