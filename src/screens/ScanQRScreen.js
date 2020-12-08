import React, { useCallback, useState, useEffect } from 'react';
import { ScanQR } from 'components';
import { useDispatch, useSelector } from 'react-redux';

import modules from 'core/modules';
import { navigate, navigateBack, Routes, onNavigate } from 'core/navigation';
 
import { WalletTracker } from '../WalletTracker';
import { walletConnectOperations } from './walletConnect/walletConnectSlice';

const TRACKER_PAGE = 'scanQRCode';

export default function ScanQRScreen(props) {
  const [showQR, setShowQR] = useState(true);
  const referer = props.navigation.getParam('referer', 'dashboard');
  const dispatch = useDispatch();
  const handleClose = () => {
    if (referer === 'transaction') {
      dispatch(modules.app.operations.showSendTokensModal(true));      
    }
    navigateBack();
  };

  const handleSuccess = (value) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/addressScanned`,
      action: 'success',
      level: 'wallet'
    });
    
    if (value.indexOf('wc:') === 0) {
      // handle wallet connect address
      navigateBack();
      dispatch(walletConnectOperations.handleUri(value));
      return;
    }

    if (referer === 'transaction') {
      dispatch(modules.transaction.operations.setAddress(value));
      dispatch(modules.app.operations.showSendTokensModal(true));
    } else {
      dispatch(modules.transaction.operations.goToTransactionOperation('all', value));
    }
    navigateBack();
  };

  useEffect(() => {
    if (referer !== 'dashboard') {
      return;
    }

    onNavigate((route) => {
      if (route === Routes.APP_SCAN_QR) {
        setShowQR(true);   
      } else if (showQR) {
        setShowQR(false);   
      }
    });
  }, [referer]);

  try {
    return showQR && (
      <ScanQR
        onClose={handleClose}
        onSuccess={handleSuccess}
        title="Scan QR Code"
        description="Scan the QR Code"
        smallDescription="Place Code inside the box"
      />
    );
  } catch(err) {
    return null;
  }
}
