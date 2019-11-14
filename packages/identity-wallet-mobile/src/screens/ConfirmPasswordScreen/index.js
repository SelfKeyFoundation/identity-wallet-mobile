import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmPassword } from './ConfirmPassword';
import { useConfirmPasswordController } from './useConfirmPasswordController';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

import modules from '@selfkey/wallet-core/modules';

const { operations, selectors } = modules.createWallet;

function ConfirmPasswordContainer(props) {
  const dispatch = useDispatch();
  const password = useSelector(selectors.getPassword);

  const controller = useConfirmPasswordController({
    password,
    onSubmit: form => dispatch(
      operations.submitPasswordConfirmationOperation(form)
    ),
  });

  const handleBack = useCallback(() => navigate(Routes.CREATE_WALLET_PASSWORD), []);

  return (
    <ConfirmPassword
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={controller.errors}
      onBack={handleBack}
    />
  );
}


export default ConfirmPasswordContainer;
