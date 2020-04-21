import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChooseDifferentWallet } from './ChooseDifferentWallet';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'chooseDifferentWallet';

function ChooseDifferentWalletContainer(props) {
  const handleExistingAddress = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/existingAddressButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.WALLET_SELECTION);    
  });

  const handleNewAddress = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/newAddressButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.CREATE_WALLET_PASSWORD, {
      canReturn: true,
    }); 
  });

  const handleBack = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'machine'
    });

    navigateBack()
  };

  return (
    <ChooseDifferentWallet
      onNewAddress={handleNewAddress}
      onExistingAddress={handleExistingAddress}
      onBack={handleBack}
    />
  );
} 

export default ChooseDifferentWalletContainer;