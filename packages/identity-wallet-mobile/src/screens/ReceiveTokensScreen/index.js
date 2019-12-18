import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
import { Clipboard, Share } from 'react-native';
import { ReceiveTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

const { operations, selectors } = modules.wallet;

function ReceiveTokensContainer(props) {
  const tokenSymbol = props.navigation.getParam('tokenSymbol', 'ETH');
  const wallet = useSelector(selectors.getWallet);
  const [visible, setVisible] = useState(true);
  const { address } = wallet;

  const handleClose = useCallback(() => {
    setVisible(false);
    navigate(Routes.APP_DASHBOARD);
  }, [setVisible]);

  const handleCopy = useCallback(() => {
    Clipboard.setString(address);
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
      />
    </React.Fragment>
  );
}


export default ReceiveTokensContainer;
