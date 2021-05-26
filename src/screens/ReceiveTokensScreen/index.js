import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
import { Clipboard, Share, View } from 'react-native';
import { ReceiveTokens } from '../../components';
import modules from 'core/modules';
import { navigate, Routes } from 'core/navigation';
import { Snackbar } from 'react-native-paper';
import { WalletTracker } from '../../WalletTracker';
import { NetworkStore } from 'core/modules/app/NetworkStore';

const TRACKER_PAGE = 'receiveTokens';

const { operations, selectors } = modules.wallet;

function ReceiveTokensContainer(props) {
  const receiveTokensModal = useSelector(modules.app.selectors.showReceiveTokensModal);
  const {
    tokenSymbol = NetworkStore.getNetwork().symbol,
    visible = false,
  } = receiveTokensModal || {};

  const wallet = useSelector(selectors.getWallet);
  const dispatch = useDispatch();
  const { address } = wallet;
  const [snackBarMessage, setSnackMessage] = useState();

  const hideSnackBar = useCallback((message) => {
    setSnackMessage(undefined)
  }, []);

  const handleClose = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/closeButton`,
      action: 'press',
      level: 'wallet'
    });

    dispatch(modules.app.operations.showReceiveTokensModal({
      visible: false,
      tokenSymbol,
    }));
  }, [tokenSymbol]);

  const handleCopy = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/copyButton`,
      action: 'press',
      level: 'wallet'
    });

    Clipboard.setString(address);
    setSnackMessage('Address Copied');
  }, [address]);

  const handleShare = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/shareButton`,
      action: 'press',
      level: 'wallet'
    });

    Share.share({
      message: address,
    });
  }, [address]);

  return (
    <React.Fragment>
      <ReceiveTokens
        tokenSymbol={tokenSymbol}
        tokenAddress={address}
        onClose={handleClose}
        visible={visible}
        onCopy={handleCopy}
        onShare={handleShare}
      >
        <Snackbar
          visible={!!snackBarMessage}
          onDismiss={hideSnackBar}
          duration={1000}
        >
          { snackBarMessage }
        </Snackbar>
      </ReceiveTokens>
    </React.Fragment>
  );
}


export default ReceiveTokensContainer;
