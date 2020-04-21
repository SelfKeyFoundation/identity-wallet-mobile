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
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const isHDWallet = useSelector(ducks.wallet.selectors.isHDWallet);
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
  const handleSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(ducks.wallet.operations.backupWalletOperation(password));
      WalletTracker.trackEvent({
        category: `${TRACKER_PAGE}/backupCreated`,
        action: 'success',
        level: 'wallet'
      });

      navigate(Routes.APP_SETTINGS)
    } catch(err) {
      if (err.message === 'wrong_password') {
        setError('Wrong password. Please try again.');
      }
    }
    setLoading(false);
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
    />
  );
}


export default CreateBackupContainer;
