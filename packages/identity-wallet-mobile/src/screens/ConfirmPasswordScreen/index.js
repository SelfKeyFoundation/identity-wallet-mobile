import React, { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { ConfirmPassword } from './ConfirmPassword';
import { useConfirmPasswordController } from './useConfirmPasswordController';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

// import modules from '@selfkey/wallet-core/modules';

function ConfirmPasswordContainer(props) {
  // const dispatch = useDispatch();
  // Validation is handled using internal state
  // Submit will send the form data to redux
  const controller = useConfirmPasswordController({
    password: props.password,
    // onSubmit: form => dispatch(
    //   modules
    //     .createWallet
    //     .operations
    //     .submitPasswordScreenOperation(form)
    // ),
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
