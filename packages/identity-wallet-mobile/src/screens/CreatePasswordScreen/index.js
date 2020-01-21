import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePassword } from './CreatePassword';
import { useCreatePasswordController } from './useCreatePasswordController';
import modules from '@selfkey/wallet-core/modules';
import { navigateBack } from '@selfkey/wallet-core/navigation';

const { operations, selectors } = modules.createWallet;

function CreatePasswordContainer(props) {
  const dispatch = useDispatch();
  const password = useSelector(selectors.getPassword);
  // Validation is handled using internal state
  // Submit will send the form data to redux
  const controller = useCreatePasswordController({
    initialValues: {
      password: password || '',
    },
    onSubmit: form => dispatch(
      operations.submitPasswordOperation(form)
    ),
  });

  const canReturn = props.navigation.getParam('canReturn', false);
  const handleBack = useCallback(() => {
    navigateBack();
  })

  return (
    <CreatePassword
      onBack={canReturn && handleBack}
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={controller.errors}
      passwordStrength={controller.passwordStrength}
    />
  );
}


export default CreatePasswordContainer;
