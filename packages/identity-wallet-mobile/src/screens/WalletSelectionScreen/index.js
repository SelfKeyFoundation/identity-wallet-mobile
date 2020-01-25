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
      if (!wallet) {
        setError({
          wallet: 'Please select a wallet.'
        })
        return;
      }

      setLoading(true);
      setError();
      try {
        await dispatch(ducks.unlockWallet.operations.unlockWithAddressOperation(wallet, password));
      } catch(err) {
        setError({
          password: 'Wrong password. Please try again.'
        });
      }

      setLoading(false);
    }, [wallet, password]);

    const wallets = useSelector(ducks.wallets.selectors.getWallets);
    const handleWalletChange = useCallback(value => {
      setWallet(value);
      setError();
    }, [setWallet]);
    const handlePassworChange = useCallback(value => {
      setPassword(value);
      setError();
    }, [setPassword]);

    const handleForgotPassword = useCallback(() => {
      navigate(Routes.UNLOCK_WALLET_FORGOT_PASSWORD, {
        walletAddress: wallet
      });
    }, [wallet]);

    useEffect(() => {
      dispatch(ducks.wallets.operations.loadWalletsOperation());
    }, []);
  
    return (
      <WalletSelection
        onBack={handleBack}
        onSubmit={handleSubmit}
        error={error}
        wallets={wallets}
        wallet={wallet}
        password={password}
        onPasswordChange={handlePassworChange}
        onWalletChange={handleWalletChange}
        isLoading={isLoading}
        onForgot={handleForgotPassword}
      />
    );
  } catch(err) {
    return null;
  }
} 

export default WalletSelectionContainer;