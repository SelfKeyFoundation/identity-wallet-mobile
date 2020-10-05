import React, { useEffect } from 'react';
import { SetupCompleteScreen } from './SetupCompleteScreen';
import { navigate, Routes } from 'core/navigation';
import { WalletTracker } from '../../WalletTracker';
import modules from 'core/modules';
import { useDispatch } from 'react-redux';

const TRACKER_PAGE = 'createWallet';

function SetupCompleteContainer(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/walletCreated`,
      action: 'success',
      level: 'wallet'
    });

    setTimeout(() => {
      dispatch(modules.unlockWallet.operations.navigateToDashboardOperation());
    }, 2500);
  }, []);

  return (
    <SetupCompleteScreen/>
  );
}


export default SetupCompleteContainer;
