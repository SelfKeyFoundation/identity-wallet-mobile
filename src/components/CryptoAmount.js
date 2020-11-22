import React, { useEffect, useState } from 'react';
import { getTokenAmount } from 'blockchain/services/price-service';

export function CryptoAmount({ usdAmount, tokenSymbol, children }) {
  const [cryptoAmount, setCryptoAmount] = useState(getTokenAmount(usdAmount));

  useEffect(() => {
    const amount = getTokenAmount(tokenSymbol);
    setCryptoAmount(amount);
  }, [usdAmount, tokenSymbol]);

  if (typeof children === 'function') {
    return children({ usdAmount, tokenSymbol, cryptoAmount })
  }

  return (
    <Text>
      { cryptoAmount }
    </Text>
  )
}

