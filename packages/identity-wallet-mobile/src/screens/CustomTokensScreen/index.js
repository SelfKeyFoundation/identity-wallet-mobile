import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTokensScreen } from './CustomTokensScreen';
import { TokenDetails, TxHistoryContainer } from '../../components';
import { navigate, Routes } from 'core/navigation';
import { IconKey, IconEth, IconTokens } from 'design-system/svg-icons';
import { getTokenPrice } from 'blockchain/services/price-service';
import modules from 'core/modules';
import styled from 'styled-components/native';
import { Grid, Row, Col } from 'design-system';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'customTokens';

const { selectors } = modules.wallet;

const TransactionsContainer = styled.View`
  margin-top: 10px;
`;

function CustomTokensContainer(props) {
  const dispatch = useDispatch();
  const handleBack = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'system'
    });

    navigate(Routes.APP_DASHBOARD);
  }, []);

  const handleReceive = useCallback((tokenSymbol) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/receiveButton`,
      action: 'press',
      level: 'system'
    });

    dispatch(modules.app.operations.showReceiveTokensModal({
      visible: true,
      tokenSymbol,
    }));
  }, []);

  const handleSend = useCallback((tokenSymbol) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/sendButton`,
      action: 'press',
      level: 'system'
    });

    dispatch(modules.transaction.operations.goToTransactionOperation('custom'));
  }, []);

  return (
    <CustomTokensScreen
      title="Custom Tokens"
      onBack={handleBack}
    >
      <Grid>
        <Row>
          <Col>
            {
              <TokenDetails
                onReceive={handleReceive}
                tokenName="Custom Tokens"
                onSend={handleSend}
                iconComponent={IconTokens}
                tokenCode="custom-tokens"
              />
            }
          </Col>
        </Row>
      </Grid>
    </CustomTokensScreen>
  );
}

export default CustomTokensContainer;