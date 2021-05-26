// @flow
import { getTokenPrice } from 'blockchain/services/price-service';
import { NetworkStore } from '../app/NetworkStore';
import { getNetwork } from '../app/selectors';

export const getRoot = state => state.wallet;
export const getWallet = (state) => getRoot(state) || {};
export const getAddress = (state) => getWallet(state).address;
export const isHDWallet = (state) => getWallet(state).type === 'hd';
export const getBalance = (state) => getWallet(state).balance || 0;
export const getFiatAmount = (state) => {
  const prices = getTokenPrice(NetworkStore.getNetwork().symbol);
  const balance = +getBalance(state);
  return balance * prices.priceUSD;
}

export const getNewPassword = (state) => getRoot(state).newPassword;
export const getVault = (state) => getRoot(state).vault;

export const getTokensFiatAmount = (state) => {
  const ethAmount = getFiatAmount(state) || 0;
  const tokensAmount = getTokens(state).reduce((sum, token) => sum + token.balanceInFiat, 0) || 0;
  return (ethAmount + tokensAmount) || 0;
}

export const getCustomTokensFiatAmount = (state) => {
  return getCustomTokens(state).reduce((sum, token) => sum + token.balanceInFiat, 0) || 0;
}

export const getCustomTokens = (state) => {
  return getTokens(state).filter((token) => token.symbol !== 'KEY' && token.symbol !== 'KI');
}

// TODO: Move to token utils
function getTokenName(symbol = NetworkStore.getNetwork().symbol) {
  symbol = symbol && symbol.toUpperCase();

  if (symbol === NetworkStore.getNetwork().symbol) {
    return NetworkStore.getNetwork().tokenName;
  }

  if (symbol === 'KI' || symbol === 'KEY') {
    return 'SelfKey';
  }

  return symbol;
}
export const getERC20Tokens = state => {
	return getTokens(state).slice(1);
};

export const getTokenBySymbol = (state, symbol) => {
	return getTokens(state).find(t => t.symbol === symbol);
};

export const getTokenByAddress = (state, address) => {
	return getTokens(state).find(t => t.address === address);
};

export const getTokens = (state) => getWallet(state).tokens || [];
export const getTokenDetails = (symbol = NetworkStore.getNetwork().symbol) => (state) => {
  const network = getNetwork(state);
  
  symbol = symbol && symbol.toUpperCase();

  if (symbol === NetworkStore.getNetwork().symbol) {
    return {
      name: NetworkStore.getNetwork().tokenName,
      // TODO: Remove this property 'code'
      code: NetworkStore.getNetwork().symbol,
      symbol: NetworkStore.getNetwork().symbol,
      amount: getBalance(state),
      decimal: 18,
      lastPrice: getTokenPrice(NetworkStore.getNetwork().symbol).priceUSD,
      lastPriceCurrency: 'usd',
      fiatCurrency: 'usd',
      fiatAmount: getFiatAmount(state),
      contractAddress: undefined 
    }
  }

  const tokens = getTokens(state);
  const token = tokens.find(t => t.symbol && t.symbol.toUpperCase() === symbol);

  return {
    name: token.name || getTokenName(token.symbol),
    // TODO: Remove this property 'code'
    code: token.symbol,
    color: token.color,
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
