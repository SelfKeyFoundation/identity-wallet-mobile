import React from 'react';
// import { useDispatch } from 'react-redux';
import { CreatePassword } from './CreatePassword';
import { useCreatePasswordController } from './useCreatePasswordController';
// import modules from '@selfkey/wallet-core/modules';

function CreatePasswordContainer(props) {
  // const dispatch = useDispatch();
  // Validation is handled using internal state
  // Submit will send the form data to redux
  const controller = useCreatePasswordController({
    // onSubmit: form => dispatch(
    //   modules
    //     .createWallet
    //     .operations
    //     .submitPasswordScreenOperation(form)
    // ),
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
