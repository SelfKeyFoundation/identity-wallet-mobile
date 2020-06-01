import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnlockWallet } from './UnlockWallet';
import { useUnlockWalletController } from './useUnlockWalletController';
import ducks from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { WalletTracker } from '../../WalletTracker';
const TRACKER_PAGE = 'unlockWallet';

const { operations, selectors } = ducks.unlockWallet;

function UnlockWalletContainer(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState();
  const isHDWallet = useSelector(ducks.wallet.selectors.isHDWallet);
  const wallet = useSelector(ducks.wallet.selectors.getWallet);
  const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);
  const errors = useSelector(selectors.getErrors);
  const controller = useUnlockWalletController({
    ...props,
    onSubmit: async (values) => {
      setLoading(true);
      const success = await dispatch(operations.submitUnlockOperation({
        ...values,
        onSuccess() {
          WalletTracker.trackEvent({
            category: `${TRACKER_PAGE}/unlock`,
            action: 'success',
            level: 'machine'
          });   
        }
      }));

      if (!success) {
        WalletTracker.trackEvent({
          category: `${TRACKER_PAGE}/unlock`,
          action: 'failed',
          level: 'machine'
        }); 
      }

      setLoading(false);
    },
  });

  const handleDifferentWallet = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/chooseDifferentWalletButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.CHOOSE_DIFFERENT_WALLET)
  };

  const handleForgotPassword = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/forgotPasswordButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.UNLOCK_WALLET_FORGOT_PASSWORD)
  }, []);

  const handleUnlockPress = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/unlockButton`,
      action: 'press',
      level: 'machine'
    });

    controller.handleSubmit();
  };

  const handlePasswordSubmit = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/passwordInput`,
      action: 'submit',
      level: 'machine'
    });

    controller.handleSubmit();
  };
  
  const handleBiometricsUnlock = async () => {
    setLoading(true);

    setTimeout(async () => {
      await dispatch(operations.submitUnlockOperation({
        biometrics: true,
      }));

      setLoading(false);
    }, 200);
  };
  
  return (
    <UnlockWallet
      onChange={controller.handleChange}
      onUnlockPress={handleUnlockPress}
      onPasswordSubmit={handlePasswordSubmit}
      onChooseDifferentWallet={handleDifferentWallet}
      values={controller.values}
      errors={errors}
      isLoading={isLoading}
      onForgot={isHDWallet && handleForgotPassword}
      supportedBiometryType={supportedBiometryType}
      biometricsEnabled={wallet.biometricsEnabled}
      onBiometricsUnlock={handleBiometricsUnlock}
    />
  );
}

export default UnlockWalletContainer;
