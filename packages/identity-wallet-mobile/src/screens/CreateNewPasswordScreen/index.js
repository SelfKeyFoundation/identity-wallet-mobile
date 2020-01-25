import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePassword } from '../CreatePasswordScreen/CreatePassword';
import { useCreatePasswordController } from '../CreatePasswordScreen/useCreatePasswordController';
import ducks from '@selfkey/wallet-core/modules';
import { navigateBack, navigate, Routes } from '@selfkey/wallet-core/navigation';


function CreateNewPasswordContainer(props) {
  const dispatch = useDispatch();
  const password = useSelector(ducks.wallet.selectors.getNewPassword);
  const controller = useCreatePasswordController({
    initialValues: {
      password: password,
    },
    onSubmit: form => dispatch(
      ducks.wallet.operations.submitNewPasswordOperation(form)
    ),
  });

  return (
    <CreatePassword
      onBack={navigateBack}
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={controller.errors}
      passwordStrength={controller.passwordStrength}
    />
  );
}

export default CreateNewPasswordContainer;
