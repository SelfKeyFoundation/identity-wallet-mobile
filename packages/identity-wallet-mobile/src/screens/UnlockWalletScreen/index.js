import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnlockWallet } from './UnlockWallet';
import { useUnlockWalletController } from './useUnlockWalletController';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

const { operations, selectors } = modules.unlockWallet;

function UnlockWalletContainer(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState();
  const errors = useSelector(selectors.getErrors);
  const controller = useUnlockWalletController({
    ...props,
    onSubmit: async (values) => {
      setLoading(true);
      await dispatch(operations.submitUnlockOperation(values));
      setLoading(false);
    },
  });

  const handleDifferentWallet = useCallback(() => {
    navigate(Routes.CHOOSE_DIFFERENT_WALLET)
  }, []);

  const handleForgotPassword = useCallback(() => {
    navigate(Routes.UNLOCK_WALLET_FORGOT_PASSWORD)
  }, []);

  return (
    <UnlockWallet
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      onChooseDifferentWallet={handleDifferentWallet}
      values={controller.values}
      errors={errors}
      isLoading={isLoading}
      onForgot={handleForgotPassword}
    />
  );
}

export default UnlockWalletContainer;
