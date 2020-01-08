import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clipboard, Share, View, Linking } from 'react-native';
import { SendTokensSuccess } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Snackbar } from 'react-native-paper';

const { operations, selectors } = modules.transaction;

function getEtherscanUrl(hash) {
  // TODO: Handle mainnet url based on configs/env variables
  return `https://ropsten.etherscan.io/tx/${hash}`;
}

export function SuccessStep(props) {
  const token = useSelector(selectors.getToken);
  const amount = useSelector(selectors.getAmount);
  const address = useSelector(selectors.getAddress);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const transaction = useSelector(selectors.getTransaction);
  const tokenDetails = useSelector(modules.wallet.selectors.getTokenDetails(token));
  const ethFee = useSelector(selectors.getETHFee);
  // const dispatch = useDstispatch();

  const handleViewOnEtherscan = useCallback(() => {
    Linking.openURL(getEtherscanUrl(transaction.hash))
  }, [transaction.hash]);

  return (
    <SendTokensSuccess
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
