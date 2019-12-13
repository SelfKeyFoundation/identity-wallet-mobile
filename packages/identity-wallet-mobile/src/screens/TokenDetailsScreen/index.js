import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TokenDetailsScreen } from './TokenDetailsScreen';
import { TokenDetails } from '../../components';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { IconKey, IconEth } from '@selfkey/mobile-ui/lib/svg-icons';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import modules from '@selfkey/wallet-core/modules';

const { selectors } = modules.wallet;

const ICON_MAP = {
  KEY: IconKey,
  KI: IconKey,
  ETH: IconEth
};

function getFiatDecimal(tokenDetails) {
  if (tokenDetails.code === 'ETH') {
    return 2;
  }

  return 4;
}

function TokenDetailsContainer(props) {
  const tokenId = props.navigation.getParam('tokenId', 'ETH');
  const tokenDetails = useSelector(selectors.getTokenDetails(tokenId));
  const handleBack = useCallback(() => {
    navigate(Routes.APP_DASHBOARD);
  });

  return (
    <TokenDetailsScreen
      title={tokenDetails.code}
      onBack={handleBack}
    >
      <TokenDetails
        iconComponent={ICON_MAP[tokenDetails.code]}
        tokenName={tokenDetails.name}
        tokenCode={tokenDetails.code}
        fiatDecimal={getFiatDecimal(tokenDetails)}
        tokenAmount={tokenDetails.amount}
        fiatCurrency="usd"
        fiatAmount={tokenDetails.balanceInFiat}
        lastPrice={tokenDetails.lastPrice}
        lastPriceCurrency="usd"
        tokenContract={tokenDetails.address}
      />
    </TokenDetailsScreen>
  );
} 

export default TokenDetailsContainer;