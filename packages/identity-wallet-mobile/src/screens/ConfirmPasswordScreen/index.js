import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmPassword } from './ConfirmPassword';
import { useConfirmPasswordController } from './useConfirmPasswordController';
import { navigate, Routes } from 'core/navigation';
// import { WalletTracker } from '../../WalletTracker';
import { Modal, Paragraph } from 'design-system';
import ducks from 'core/modules';

const { operations, selectors } = ducks.createWallet;

function ConfirmPasswordContainer(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const password = useSelector(selectors.getPassword);
  const [values, setValues] = useState();
  // const mnemonic = useSelector(selectors.getMnemonicPhrase);
  // const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);
  // const [showBiometricsModal, setShowBiometricsModal] = useState(false);
  const controller = useConfirmPasswordController({
    password,
    onSubmit: form => {
      setLoading(true);
      dispatch(operations.submitPasswordConfirmationOperation(form))
        .finally(() => setLoading(false));
    },
  });

  const handleBack = useCallback(() => navigate(Routes.CREATE_WALLET_PASSWORD), []);

  return (
    <React.Fragment>
      <ConfirmPassword
        isLoading={isLoading}
        onChange={controller.handleChange}
        onSubmit={controller.handleSubmit}
        values={controller.values}
        errors={controller.errors}
        onBack={handleBack}
      />
    </React.Fragment>
  );
}


export default ConfirmPasswordContainer;
