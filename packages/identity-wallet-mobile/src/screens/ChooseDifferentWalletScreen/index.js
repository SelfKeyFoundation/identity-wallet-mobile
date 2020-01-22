import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChooseDifferentWallet } from './ChooseDifferentWallet';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

function ChooseDifferentWalletContainer(props) {
  const handleExistingAddress = useCallback(() => {
    navigate(Routes.WALLET_SELECTION);
  });

  const handleNewAddress = useCallback(() => {
    navigate(Routes.CREATE_WALLET_PASSWORD, {
      canReturn: true,
    });
  });

  const handleBack = () => {
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