import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clipboard, Share, View } from 'react-native';
import { SendTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Snackbar } from 'react-native-paper';

const { operations, selectors } = modules.transaction;

export function SendStep(props) {
  const token = useSelector(selectors.getToken);
  const amount = useSelector(selectors.getAmount);
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
        dispatch(operations.setTransactionFee(value));
        break;
      }
    }
  });

  const handleTokenSelect = useCallback((token) => {
    dispatch(operations.setSelectedTokenOperation(token));
  });

  const handleQRCodePress = useCallback(() => {
    navigate(Routes.SCAN_QR, {
      referer: 'transaction'
    });

    props.onCancel({
      navigate: false
    });
  })

  return (
    <SendTokens
      onCancel={props.onCancel}
      errors={errors}
      canSend={canSend}
      onQRCodePress={handleQRCodePress}
      onAdvancedPress={() => {
        dispatch(operations.setAdvancedMode(!isAdvancedMode));
      }}
      onSend={() => {
        dispatch(operations.sendTransaction());
      }}
      onMaxPress={() => {
        dispatch(operations.setAmount(tokenDetails.amount))
      }}
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
