import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
import { Clipboard, Share, View } from 'react-native';
import { SendTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Snackbar } from 'react-native-paper';

const { operations, selectors } = modules.transaction;

function SendTokensScreen(props) {
  const [visible, setVisible] = useState(true);

  const token = useSelector(selectors.getToken);
  const amount = useSelector(selectors.getAmount);
  const address = useSelector(selectors.getAddress);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const errors = useSelector(selectors.getErrors);
  const transactionFee = useSelector(selectors.getTransactionFee);
  const transactionFeeOptions = useSelector(selectors.getTransactionFeeOptions);
  const tokens = useSelector(modules.wallet.selectors.getTokens);
  const isAdvancedMode = useSelector(selectors.isAdvancedMode);
  const tokenDetails = useSelector(modules.wallet.selectors.getTokenDetails(token));
  const dispatch = useDispatch();

  const handleChange = useCallback((field, value) => {
    console.log('handlechange', { field, value });
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
  const handleClose = useCallback(() => {
    setVisible(false);
    navigate(Routes.APP_DASHBOARD);
  }, [setVisible]);

  useEffect(() => {
    setVisible(true);
  }, [props]);

  return (
    <React.Fragment>
      <Dashboard />
      <SendTokens
        visible={visible}
        onClose={handleClose}
        onCancel={handleClose}
        errors={errors}
        onQRCodePress={() => {
          console.log('QR Code');
        }}
        onAdvancedPress={() => {
          dispatch(operations.setAdvancedMode(!isAdvancedMode));
        }}
        onSend={() => {
          console.log('Send');
        }}
        onMaxPress={() => {
          dispatch(operations.setAmount(tokenDetails.amount))
        }}
        advancedMode={isAdvancedMode}
        onChange={handleChange}
        data={{
          address,
          amount,
          fiatAmount,
          transactionFee,
          token,
        }}
        tokenDetails={tokenDetails}
        tokens={tokens}
        transactionFeeOptions={transactionFeeOptions}
      />
    </React.Fragment>
  );
}


export default SendTokensScreen;
