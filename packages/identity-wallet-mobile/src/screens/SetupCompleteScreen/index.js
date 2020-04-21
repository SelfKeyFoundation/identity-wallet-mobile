import React, { useEffect } from 'react';
import { SetupCompleteScreen } from './SetupCompleteScreen';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'createWallet';

function SetupCompleteContainer(props) {
  useEffect(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/walletCreated`,
      action: 'success',
      level: 'wallet'
    });

    setTimeout(() => {
      navigate(Routes.APP_DASHBOARD);
    }, 2500);
  }, []);

  return (
    <SetupCompleteScreen/>
  );
}


export default SetupCompleteContainer;
