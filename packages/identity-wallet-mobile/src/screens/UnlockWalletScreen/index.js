import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnlockWallet } from './UnlockWallet';
import { useUnlockWalletController } from './useUnlockWalletController';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

const { operations, selectors } = modules.unlockWallet;

function UnlockWalletContainer(props) {
  const dispatch = useDispatch();
  const errors = useSelector(selectors.getErrors);
  const controller = useUnlockWalletController({
    ...props,
    onSubmit: (values) => {
      dispatch(operations.submitUnlockOperation(values));
    },
  });

  const handleDifferentWallet = useCallback(() => {
    navigate(Routes.CHOOSE_DIFFERENT_WALLET)
  });

  return (
    <UnlockWallet
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      onChooseDifferentWallet={handleDifferentWallet}
      values={controller.values}
      errors={errors}
    />
  );
}

export default UnlockWalletContainer;
