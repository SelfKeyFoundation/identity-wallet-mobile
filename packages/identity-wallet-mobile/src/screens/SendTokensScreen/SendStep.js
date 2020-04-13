import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clipboard, Share, View } from 'react-native';
import { SendTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Snackbar } from 'react-native-paper';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'sendTokens';

const { operations, selectors } = modules.transaction;

export function SendStep(props) {
  const token = useSelector(selectors.getToken);
  const amount = useSelector(selectors.getAmount);
  const isSending = useSelector(selectors.isSending);
  const address = useSelector(selectors.getAddress);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const tokenOptions = useSelector(selectors.getTokenOptions);
  const errors = useSelector(selectors.getErrors);
  const canSend = useSelector(selectors.canSend);
  const transactionFee = useSelector(selectors.getTransactionFee);
  const transactionFeeOptions = useSelector(selectors.getTransactionFeeOptions);
  const tokens = useSelector(modules.wallet.selectors.getTokens);
  const isAdvancedMode = useSelector(selectors.isAdvancedMode);
  const tokenDetails = useSelector(modules.wallet.selectors.getTokenDetails(token));
  const dispatch = useDispatch();

  const handleChange = useCallback((field, value) => {
    switch(field) {
      case 'address': {
        dispatch(operations.setAddress(value));
        break;
      }
      case 'amount': {
        dispatch(operations.setAmount(value));
        break;
      }
      case 'transactionFee': {
        WalletTracker.trackEvent({
          category: `${TRACKER_PAGE}/transactionFee-${value}`,
          action: 'press',
          level: 'wallet'
        });

        dispatch(operations.setTransactionFee(value));
        break;
      }
    }
  });

  const handleTokenSelect = useCallback((token) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/tokenDropDown`,
      action: 'select',
      level: 'wallet'
    });

    dispatch(operations.setSelectedTokenOperation(token));
  });

  const handleQRCodePress = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/scanQRCode`,
      action: 'press',
      level: 'wallet'
    });

    navigate(Routes.SCAN_QR, {
      referer: 'transaction'
    });

    props.onCancel({
      navigate: false
    });
  });

  const handleSend = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/sendButton`,
      action: 'press',
      level: 'wallet'
    });

    dispatch(operations.sendTransaction())
  };

  const handleAdvancedOptions = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/advancedOptionsButton`,
      action: 'press',
      level: 'wallet'
    });

    dispatch(operations.setAdvancedMode(!isAdvancedMode));
  };

  const handleMax = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/maxAmountButton`,
      action: 'press',
      level: 'wallet'
    });

    dispatch(operations.setAmount(tokenDetails.amount))
  };

  const handleCancel = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/cancelButton`,
      action: 'press',
      level: 'wallet'
    });

    props.onCancel();
  };

  useEffect(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/${token}`,
      action: 'show',
      level: 'wallet'
    });
  }, []);

  return (
    <SendTokens
      onCancel={handleCancel}
      errors={errors}
      canSend={canSend}
      onQRCodePress={handleQRCodePress}
      onAdvancedPress={handleAdvancedOptions}
      onSend={handleSend}
      onMaxPress={handleMax}
      isSending={isSending}
      advancedMode={isAdvancedMode}
      onChange={handleChange}
      tokenOptions={tokenOptions}
      onTokenSelect={handleTokenSelect}
      data={{
        address,
        amount,
        fiatAmount,
        transactionFee,
        token,
      }}
      tokenDetails={token && tokenDetails}
      tokens={tokens}
      transactionFeeOptions={transactionFeeOptions}
    />
  );
}
