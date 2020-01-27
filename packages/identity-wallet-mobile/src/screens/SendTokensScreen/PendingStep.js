import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clipboard, Share, View, Linking } from 'react-native';
import { SendTokensPending } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Snackbar } from 'react-native-paper';
import EthUtils from '@selfkey/blockchain/util/eth-utils';

const { operations, selectors } = modules.transaction;


export function PendingStep(props) {
  const token = useSelector(selectors.getToken);
  const amount = useSelector(selectors.getAmount);
  const address = useSelector(selectors.getAddress);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const transaction = useSelector(selectors.getTransaction);
  const tokenDetails = useSelector(modules.wallet.selectors.getTokenDetails(token));
  const ethFee = useSelector(selectors.getETHFee);
  // const dispatch = useDstispatch();

  const handleViewOnEtherscan = useCallback(() => {
    Linking.openURL(EthUtils.getTxReceiptUrl(transaction.hash))
  }, [transaction.hash]);

  return (
    <SendTokensPending
      fiatAmount={fiatAmount}
      token={token}
      tokenAmount={amount}
      networkFee={ethFee}
      remainingBalance={transaction.remainingBalance}
      addressTo={address}
      onViewOnEtherscan={handleViewOnEtherscan}
    />
  );
}
