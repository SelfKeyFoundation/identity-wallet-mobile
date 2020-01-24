import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WalletSelection } from './WalletSelection';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

function WalletSelectionContainer(props) {
  try {
    const [error, setError] = useState();
    const [wallet, setWallet] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setLoading] = useState();
    const dispatch = useDispatch();
    const handleBack = useCallback(() => {
      navigateBack();
    }, []);

    const handleSubmit = useCallback(async () => {
      setLoading(true);

      try {
        await dispatch(ducks.unlockWallet.operations.unlockWithAddressOperation(wallet, password));
      } catch(err) {
        setError(err);
      }

      setLoading(false);
    }, [wallet, password]);

    const wallets = useSelector(ducks.wallets.selectors.getWallets);
    const handleWalletChange = useCallback(value => setWallet(value), [setWallet]);
    const handlePassworChange = useCallback(value => setPassword(value), [setPassword]);

    useEffect(() => {
      dispatch(ducks.wallets.operations.loadWalletsOperation());
    }, []);
  
    return (
      <WalletSelection
        onBack={handleBack}
        onSubmit={handleSubmit}
        error={error}
        wallets={wallets}
        wallet={wallet}MOB
        password={password}
        onPasswordChange={handlePassworChange}
        onWalletChange={handleWalletChange}
        isLoading={isLoading}
      />
    );
  } catch(err) {
    return null;
  }
} 

export default WalletSelectionContainer;