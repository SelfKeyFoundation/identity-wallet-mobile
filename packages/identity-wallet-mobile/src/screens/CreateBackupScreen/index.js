import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateBackup } from './CreateBackup';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'createBackup';

function CreateBackupContainer(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isBiometricsLoading, setBiometricsLoading] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const isHDWallet = useSelector(ducks.wallet.selectors.isHDWallet);
  const wallet = useSelector(ducks.wallet.selectors.getWallet);
  const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);
  const handleBack = useCallback(() => navigate(Routes.APP_SETTINGS), []);
  const handleChange = useCallback(password => setPassword(password), []);
  const handleForgotPassword = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/forgotPasswordButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.UNLOCK_WALLET_FORGOT_PASSWORD)
  }, []);

  const handleSubmit = useCallback(async (biometrics) => {
    if (isLoading) {
      return;
    }

    if (biometrics) {
      setBiometricsLoading(true);
    } else {
      setLoading(true);
    }

    try {
      await dispatch(ducks.wallet.operations.backupWalletOperation({
        password,
        biometrics,
      }));

      WalletTracker.trackEvent({
        category: `${TRACKER_PAGE}/backupCreated`,
        action: 'success',
        level: 'wallet'
      });

      navigate(Routes.APP_SETTINGS)
    } catch(err) {
      if (!biometrics && err.message === 'wrong_password') {
        setError('Wrong password. Please try again.');
      }
    }
    
    if (biometrics) {
      setBiometricsLoading(false);
    } else {
      setLoading(false);
    }
  }, [isLoading, password]);
  
  return (
    <CreateBackup
      onChange={handleChange}
      onSubmit={handleSubmit}
      password={password}
      error={error}
      onBack={handleBack}
      isLoading={isLoading}
      onForgot={isHDWallet && handleForgotPassword}
      supportedBiometryType={supportedBiometryType}
      biometricsEnabled={wallet.biometricsEnabled}
      isBiometricsLoading={isBiometricsLoading}
    />
  );
}


export default CreateBackupContainer;
