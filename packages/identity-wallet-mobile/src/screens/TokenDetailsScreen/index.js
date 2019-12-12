import React, { useEffect } from 'react';
import { TokenDetailsScreen } from './TokenDetailsScreen';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { IconKey, IconEth } from '@selfkey/mobile-ui/lib/svg-icons';

function TokenDetailsContainer(props) {
  // get parameters
  // select token details

  return (
    <TokenDetailsScreen
      iconComponent={IconKey}
      tokenName="SelfKey"
      tokenCode="key"
      tokenAmount={85262.781}
      fiatCurrency="usd"
      fiatAmount={951.44}
      lastPrice={0.0020}
      lastPriceCurrency="usd"
      tokenContract="0xDF8e950e8b90bA07Cc104C70BA28E5812f75A042"/>
  );
} 

export default TokenDetailsContainer;