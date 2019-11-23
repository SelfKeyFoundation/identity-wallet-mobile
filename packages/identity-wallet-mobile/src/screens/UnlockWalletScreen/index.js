import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnlockWallet } from './UnlockWallet';
import { useUnlockWalletController } from './useUnlockWalletController';
import modules from '@selfkey/wallet-core/modules';

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

  return (
    <UnlockWallet
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={errors}
    />
  );
}

export default UnlockWalletContainer;
