import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionDetails } from '../../components';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { getUsdPrice } from '@selfkey/blockchain/services/price-service';
import ducks from '@selfkey/wallet-core/modules';
import styled from 'styled-components/native';
import { Modal } from '@selfkey/mobile-ui';
import EthUtils from '@selfkey/blockchain/util/eth-utils';
import { Linking } from 'react-native';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'txDetailsModal';

function TokenDetailsContainer(props) {
  const { visible, params, onClose } = props;
  const { hash: hashParam } = params;
  const transaction = useSelector(ducks.txHistory.selectors.getTransactionByHash(hashParam));
  const { value, hash, tokenSymbol } = transaction || {};

  const fiatAmount = useMemo(() => {
    return getUsdPrice(value, tokenSymbol)
  }, [value, tokenSymbol]);

  const handleViewOnEtherscan = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/viewOnEtherscanLink`,
      action: 'press',
      level: 'wallet'
    });

    Linking.openURL(EthUtils.getTxReceiptUrl(hash));
  };

  const handleClose = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/closeButton`,
      action: 'press',
      level: 'wallet'
    });

    onClose();
  };

  if (!transaction) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title="Transaction Details"
      footer={null}
      noBodyPadding
    >
      <TransactionDetails
        onViewOnEtherscan={handleViewOnEtherscan}
        token={tokenSymbol}
        date={transaction.timeStamp}
        fiatAmount={fiatAmount}
        tokenAmount={value}
        addressTo={transaction.to}
        addressFrom={transaction.from}
        isError={transaction.isError}
        status={transaction.status}
        tokenDecimal={transaction.tokenDecimal}
      />
    </Modal>
  );
} 

export default TokenDetailsContainer;