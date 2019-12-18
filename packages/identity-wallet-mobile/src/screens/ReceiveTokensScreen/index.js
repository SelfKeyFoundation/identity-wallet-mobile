import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
import { Clipboard, Share, View } from 'react-native';
import { ReceiveTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Snackbar } from 'react-native-paper';

const { operations, selectors } = modules.wallet;

function ReceiveTokensContainer(props) {
  const tokenSymbol = props.navigation.getParam('tokenSymbol', 'ETH');
  const wallet = useSelector(selectors.getWallet);
  const [visible, setVisible] = useState(true);
  const { address } = wallet;
  const [snackBarMessage, setSnackMessage] = useState();

  const hideSnackBar = useCallback((message) => {
    setSnackMessage(undefined)
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    navigate(Routes.APP_DASHBOARD);
  }, [setVisible]);

  const handleCopy = useCallback(() => {
    Clipboard.setString(address);
    setSnackMessage('Address Copied');
  }, [address]);

  const handleShare = useCallback(() => {
    Share.share({
      message: address,
    });
  }, [address]);

  useEffect(() => {
    setVisible(true);
  }, [props]);

  return (
    <React.Fragment>
      <Dashboard />
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
