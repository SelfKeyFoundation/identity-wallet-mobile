import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePassword } from './CreatePassword';
import { useCreatePasswordController } from './useCreatePasswordController';
import modules from '@selfkey/wallet-core/modules';

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
      operations.submitPasswordScreenOperation(form)
    ),
  });

  return (
    <CreatePassword
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={controller.errors}
      passwordStrenght={controller.passwordStrenght}
    />
  );
}


export default CreatePasswordContainer;
