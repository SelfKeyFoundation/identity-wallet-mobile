let priceData = [];

export async function loadTokenPrices() {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=2000");
  const { data } = await res.json();

  setPriceData(data.map(row => ({
    name: row.name,
    symbol: row.symbol,
    source: 'https://coincap.io',
    priceUSD: +row.priceUsd,
  })));
}

export function setPriceData(data) {
  priceData = data;
}

export function getUsdPrice(amount, token = 'ETH') {
  const price = getTokenPrice(token);

  return amount * price.priceUSD;
}

export function getTokenAmount(amountUsd, token = 'ETH') {
  const price = getTokenPrice(token);
  const amount = amountUsd / price.priceUSD;
  return amount;
}

export function getTokenPrice(symbol) {
  let parsedSymbol = symbol && symbol.toUpperCase();

  if (parsedSymbol === 'KI') {
    parsedSymbol = 'KEY';
  }

  let price = priceData.find(p => p.symbol === parsedSymbol);
  
  if (!price) {
    price = {
      name: parsedSymbol,
      symbol: parsedSymbol,
      source: 'not-found',
      priceUSD: 0,
    };  
  }

  return price;
}