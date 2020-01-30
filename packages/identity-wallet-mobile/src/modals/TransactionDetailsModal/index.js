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

function TokenDetailsContainer(props) {
  const { visible, params, onClose } = props;
  const { hash } = params;
  const transaction = useSelector(ducks.txHistory.selectors.getTransactionByHash(hash));
  const fiatAmount = useMemo(() => {
    return getUsdPrice(transaction.value, transaction.tokenSymbol)
  }, [transaction.value, transaction.tokenSymbol]);

  const handleViewOnEtherscan = useCallback(() => {
    Linking.openURL(EthUtils.getTxReceiptUrl(transaction.hash))
  }, [transaction.hash]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Transaction Details"
      footer={null}
      noBodyPadding
    >
      <TransactionDetails
        onViewOnEtherscan={handleViewOnEtherscan}
        token={transaction.tokenSymbol}
        date={transaction.timeStamp}
        fiatAmount={fiatAmount}
        tokenAmount={transaction.value}
        addressTo={transaction.to}
        addressFrom={transaction.from}
        isError={transaction.isError}
        status={transaction.status}
      />
    </Modal>
  );
} 

export default TokenDetailsContainer;