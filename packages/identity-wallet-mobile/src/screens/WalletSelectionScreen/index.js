import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WalletSelection } from './WalletSelection';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'chooseDifferentWallet';

function WalletSelectionContainer(props) {
  try {
    const isUnlockScreen = props.navigation.getParam('isUnlockScreen');
    const [error, setError] = useState();
    const [wallet, setWallet] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setLoading] = useState();
    const dispatch = useDispatch();
    const handleBack = useCallback(() => {
      WalletTracker.trackEvent({
        category: `${TRACKER_PAGE}/backButton`,
        action: 'press',
        level: 'machine'
      });

      navigateBack();
    }, []);

    const handleSubmit = useCallback(async () => {
      WalletTracker.trackEvent({
        category: `${TRACKER_PAGE}/unlockButton`,
        action: 'press',
        level: 'machine'
      });

      if (!wallet) {
        setError({
          wallet: 'Please select a wallet.'
        })

        WalletTracker.trackEvent({
          category: `${TRACKER_PAGE}/error`,
          action: 'display',
          level: 'machine'
        });
        return;
      }

      setLoading(true);
      setError();
      try {
        await dispatch(ducks.unlockWallet.operations.unlockWithAddressOperation(wallet, password));
      } catch(err) {
        WalletTracker.trackEvent({
          category: `${TRACKER_PAGE}/error`,
          action: 'display',
          level: 'machine'
        });

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
      WalletTracker.trackEvent({
        category: `${TRACKER_PAGE}/forgotPasswordButton`,
        action: 'press',
        level: 'machine'
      });

      navigate(Routes.UNLOCK_WALLET_FORGOT_PASSWORD, {
        walletAddress: wallet
      });
    }, [wallet]);

    const handleCreateWallet = () => navigate(Routes.CHOOSE_DIFFERENT_WALLET);

    useEffect(() => {
      dispatch(ducks.wallets.operations.loadWalletsOperation())
      .then((selectedAddress) => {
        setWallet(selectedAddress);
      });
    }, []);
  
    return (
      <WalletSelection
        isUnlockScreen={isUnlockScreen}
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
        onCreateWallet={handleCreateWallet}
      />
    );
  } catch(err) {
    return null;
  }
} 

export default WalletSelectionContainer;