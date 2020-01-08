import React, { useCallback } from 'react';
import { ScanQR } from '@selfkey/identity-wallet-mobile/src/components';
import { useDispatch, useSelector } from 'react-redux';

import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

const { operations, selectors } = modules.transaction;

export default function ScanQRScreen(props) {
  const referer = props.navigation.getParam('referer', 'dashboard');
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    if (referer === 'transaction') {
      navigate(Routes.APP_SEND_TOKENS);
    } else {
      navigate(Routes.APP_DASHBOARD);
    }
  }, []);

  const handleSuccess = useCallback((address) => {
    if (referer === 'transaction') {
      dispatch(operations.setAddress(address));
      navigate(Routes.APP_SEND_TOKENS);
    } else {
      dispatch(operations.goToTransactionOperation('ETH', address));
    }
  });

  return (
    <ScanQR
      onClose={handleClose}
      onSuccess={handleSuccess}
    />
  );
}
