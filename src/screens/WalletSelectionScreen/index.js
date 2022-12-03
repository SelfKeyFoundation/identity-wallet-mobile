import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WalletSelection } from './WalletSelection';
import { navigate, Routes, navigateBack } from 'core/navigation';
import ducks from 'core/modules';
import { WalletTracker } from '../../WalletTracker';
import {getNavigationParam} from '../../v2/screen-utils';

const TRACKER_PAGE = 'chooseDifferentWallet';

function WalletSelectionContainer(props) {
  const isUnlockScreen = getNavigationParam(props, 'isUnlockScreen', false);
  const [error, setError] = useState();
  const [wallet, setWallet] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoading] = useState();
  const [isBiometricsLoading, setBiometricsLoading] = useState();
  const dispatch = useDispatch();
  const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);
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
      await dispatch(ducks.unlockWallet.operations.unlockWithAddressOperation({ address: wallet, password }));
    } catch (err) {
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

  const handleBiometricsUnlock = async () => {
    setBiometricsLoading(true);

    setTimeout(async () => {
      await dispatch(ducks.unlockWallet.operations.unlockWithAddressOperation({
        address: wallet,
        biometrics: true,
      }));

      setBiometricsLoading(false);
    }, 200);
  };

  const selectedWallet = wallets.find(w => w.address === wallet);

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
      supportedBiometryType={supportedBiometryType}
      biometricsEnabled={selectedWallet && selectedWallet.biometricsEnabled}
      onBiometricsUnlock={handleBiometricsUnlock}
      selectedWallet={selectedWallet}
      isBiometricsLoading={isBiometricsLoading}
    />
  );
}

export default WalletSelectionContainer;