import React, { useCallback, useState, useEffect } from 'react';
import { ScanQR } from '@selfkey/identity-wallet-mobile/src/components';
import { useDispatch, useSelector } from 'react-redux';

import modules from '@selfkey/wallet-core/modules';
import { navigate, navigateBack, Routes, onNavigate } from '@selfkey/wallet-core/navigation';
 
const { operations, selectors } = modules.transaction;
import { WalletTracker } from '../WalletTracker';

const TRACKER_PAGE = 'scanQRCode';

export default function ScanQRScreen(props) {
  const [showQR, setShowQR] = useState(true);
  const referer = props.navigation.getParam('referer', 'dashboard');
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    if (referer === 'transaction') {
      dispatch(modules.app.operations.showSendTokensModal(true));      
    }
    navigateBack();
  }, [referer, navigate]);

  const handleSuccess = useCallback((address) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/addressScanned`,
      action: 'success',
      level: 'wallet'
    });

    if (referer === 'transaction') {
      dispatch(operations.setAddress(address));
      dispatch(modules.app.operations.showSendTokensModal(true));
    } else {
      dispatch(operations.goToTransactionOperation('all', address));
    }
    navigateBack();
  }, [referer, operations]);

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
        description="Scan any ERC-20 Token QR Code"
        smallDescription="Place Code inside the box"
      />
    );
  } catch(err) {
    return null;
  }
}
