import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTokensScreen } from './CustomTokensScreen';
import { TokenDetails, TxHistoryContainer } from '../../components';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { IconKey, IconEth, IconTokens } from '@selfkey/mobile-ui/lib/svg-icons';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import modules from '@selfkey/wallet-core/modules';
import styled from 'styled-components/native';
import { Grid, Row, Col } from '@selfkey/mobile-ui';

const { selectors } = modules.wallet;

const TransactionsContainer = styled.View`
  margin-top: 10px;
`;

function CustomTokensContainer(props) {
  const dispatch = useDispatch();
  const handleBack = useCallback(() => {
    navigate(Routes.APP_DASHBOARD);
  }, []);

  const handleReceive = useCallback((tokenSymbol) => {
    dispatch(modules.app.operations.showReceiveTokensModal({
      visible: true,
      tokenSymbol,
    }));
  }, []);

  const handleSend = useCallback((tokenSymbol) => {
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