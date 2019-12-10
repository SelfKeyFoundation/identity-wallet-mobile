let priceData = [];

export async function loadTokenPrices() {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=2000");
  const { data } = await res.json();

  priceData = data.map(row => ({
    name: row.name,
    symbol: row.symbol,
    source: 'https://coincap.io',
    priceUSD: +row.priceUsd,
  }));
}

export function getTokenPrice(symbol) {
  let parsedSymbol = symbol.toUpperCase();

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