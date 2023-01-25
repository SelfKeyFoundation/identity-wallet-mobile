import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePassword } from '../CreatePasswordScreen/CreatePassword';
import { useCreatePasswordController } from '../CreatePasswordScreen/useCreatePasswordController';
import ducks from 'core/modules';
import { navigateBack, navigate, Routes } from 'core/navigation';


function CreateNewPasswordContainer(props) {
  const dispatch = useDispatch();
  const password = useSelector(ducks.wallet.selectors.getNewPassword);
  const controller = useCreatePasswordController({
    initialValues: {
      password: password,
    },
    onSubmit: async (form) => {
      // controller.handleChange
      await dispatch(
        ducks.wallet.operations.submitNewPasswordOperation(form)
      );
    },
  });

  console.log('password', { password, controller });

  return (
    <CreatePassword
      onBack={() => {
        controller.onBack();
        navigateBack()
      }}
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={controller.errors}
      passwordStrength={controller.passwordStrength}
    />
  );
}

export default CreateNewPasswordContainer;
