import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmPassword } from '../ConfirmPasswordScreen/ConfirmPassword';
import { useConfirmPasswordController } from '../ConfirmPasswordScreen/useConfirmPasswordController';
import { navigateBack } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

function ConfirmNewPasswordContainer(props) {
  const dispatch = useDispatch();
  const password = useSelector(ducks.wallet.selectors.getNewPassword);

  const controller = useConfirmPasswordController({
    password,
    onSubmit: form => dispatch(
      ducks.wallet.operations.confirmNewPasswordOperation(form)
    ),
  });

  return (
    <ConfirmPassword
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={controller.errors}
      onBack={navigateBack}
    />
  );
}

export default ConfirmNewPasswordContainer;
