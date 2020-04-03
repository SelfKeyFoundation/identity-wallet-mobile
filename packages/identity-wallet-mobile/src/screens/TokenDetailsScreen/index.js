import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TokenDetailsScreen } from './TokenDetailsScreen';
import { TokenDetails, TxHistoryContainer } from '../../components';
import { navigate, navigateBack, Routes } from '@selfkey/wallet-core/navigation';
import { IconKey, IconEth } from '@selfkey/mobile-ui/lib/svg-icons';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import modules from '@selfkey/wallet-core/modules';
import styled from 'styled-components/native';
import { Grid, Row, Col } from '@selfkey/mobile-ui';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'tokenDetails';

const { selectors } = modules.wallet;

const TransactionsContainer = styled.View`
  margin-top: 10px;
`;

const TokenIconContainer = styled.View`
  background-color: ${(props) => props.color || '#2DA1F8' };
  padding: 11px 17px 14px 18px;
  border-radius: 5px;
`;

const TokenIconTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white };
  font-size: 16px;
  line-height: 19px;
  font-family: ${props => props.theme.fonts.regular};
  text-transform: uppercase;
`;

const TokenIcon = props => (
  <TokenIconContainer color={props.color}>
    <TokenIconTitle>
      { props.name && props.name.substring(0, 1)}
    </TokenIconTitle>
  </TokenIconContainer>
);

function getCustomTokenIcon(name, color) {
  return () => <TokenIcon color={color} name={name} />;
}

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
  const tokenSymbol = props.navigation.getParam('tokenId', 'ETH').toUpperCase();
  const tokenDetails = useSelector(selectors.getTokenDetails(tokenSymbol));
  const dispatch = useDispatch();

  const handleReceive = useCallback((tokenSymbol) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/receiveButton`,
      action: 'press',
      level: 'wallet'
    });

    WalletTracker.trackPageView('app/receiveTokens');

    dispatch(modules.app.operations.showReceiveTokensModal({
      visible: true,
      tokenSymbol,
    }));
  }, []);

  const handleSend = useCallback((tokenSymbol) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/sendButton`,
      action: 'press',
      level: 'wallet'
    });

    WalletTracker.trackPageView('app/sendTokens');
    dispatch(modules.transaction.operations.goToTransactionOperation(tokenDetails.symbol));
  }, [tokenDetails.symbol]);

  const handleBack = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'wallet'
    });

    navigateBack();
  };

  return (
    <TokenDetailsScreen
      title={tokenDetails.code}
      onBack={handleBack}
    >
      <Grid>
        <Row>
          <Col>
            <TokenDetails
              onReceive={handleReceive}
              onSend={handleSend}
              iconComponent={ICON_MAP[tokenDetails.code] || getCustomTokenIcon(tokenDetails.name, tokenDetails.color)}
              tokenName={tokenDetails.name}
              tokenCode={tokenDetails.code}
              tokenDecimal={tokenDetails.decimal}
              fiatDecimal={getFiatDecimal(tokenDetails)}
              tokenAmount={tokenDetails.amount}
              fiatCurrency="usd"
              fiatAmount={tokenDetails.fiatAmount}
              lastPrice={tokenDetails.lastPrice}
              lastPriceCurrency="usd"
              contractAddress={tokenDetails.contractAddress}
            />
          </Col>
        </Row>
        <Row marginTop={20}>
          <Col>
            <TxHistoryContainer
              tokenSymbol={tokenSymbol}
              showEmptyAlert
            />
          </Col>
        </Row>
      </Grid>
    </TokenDetailsScreen>
  );
} 

export default TokenDetailsContainer;