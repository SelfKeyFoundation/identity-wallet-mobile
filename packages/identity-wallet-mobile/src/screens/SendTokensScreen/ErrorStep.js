import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clipboard, Share, View, Linking } from 'react-native';
import { SendTokensError } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Snackbar } from 'react-native-paper';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'sendTokens/error';

const { operations, selectors } = modules.transaction;

export function ErrorStep(props) {
  const dispatch = useDispatch();
  const token = useSelector(selectors.getToken);
  const amount = useSelector(selectors.getAmount);
  const address = useSelector(selectors.getAddress);
  const fiatAmount = useSelector(selectors.getFiatAmount);
  const transaction = useSelector(selectors.getTransaction);
  const tokenDetails = useSelector(modules.wallet.selectors.getTokenDetails(token));
  const ethFee = useSelector(selectors.getETHFee);
  const [snackBarMessage, setSnackMessage] = useState();

  useEffect(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}`,
      action: 'show',
      level: 'wallet'
    });
  }, []);

  const hideSnackBar = useCallback((message) => {
    setSnackMessage(undefined)
  }, []);

  const handleCopy = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/copyAddressButton`,
      action: 'press',
      level: 'wallet'
    });

    Clipboard.setString(address);
    setSnackMessage('Address Copied.');
  }, [address]);

  const handleInfo = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/errorInfoLink`,
      action: 'press',
      level: 'wallet'
    });

    Linking.openURL(transaction.errorInfoUrl)
  }, [transaction.errorInfoUrl]);

  const handleQRCode = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/QRCodeButton`,
      action: 'press',
      level: 'wallet'
    });

    dispatch(modules.app.operations.showSendTokensModal(false));
    navigate(Routes.SCAN_QR, {
      tokenSymbol: 'ETH',
    });
  }, []);

  return (
    <React.Fragment>
      <SendTokensError
        onQRCode={handleQRCode}
        onCopy={handleCopy}
        onInfo={handleInfo}
        errorInfo={transaction.errorInfo}
        errorMessage={transaction.errorMessage}
        address={address}
      />
      <Snackbar
        visible={!!snackBarMessage}
        onDismiss={hideSnackBar}
        duration={1000}
      >
        { snackBarMessage }
      </Snackbar>
    </React.Fragment>
  );
}
