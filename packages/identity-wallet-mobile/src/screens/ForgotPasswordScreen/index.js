import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPassword } from './ForgotPassword';
import ducks from '@selfkey/wallet-core/modules';
import { navigateBack, navigate, Routes } from '@selfkey/wallet-core/navigation';

function ForgotPasswordContainer(props) {
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = useState();
  const [isLoading, setLoading] = useState();

  const walletAddress = props.navigation.getParam('walletAddress');
  const [error, setError] = useState();
  const handleBack = useCallback(() => {
    navigateBack();
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!mnemonic) {
      setError('Please enter the recovery phrase.');
    }

    try {
      setLoading(true);
      setError(undefined);
      await dispatch(ducks.unlockWallet.operations.restoreAccessOperation(mnemonic, walletAddress));
    } catch(err) {
      if (err.message = 'wrong_mnemonic') {
        setError('The recovery phrase is not correct, please try again.');
      } else {
        setError(err.message);
      }
    }

    setLoading(false);
  }, [mnemonic, walletAddress]);

  const handleInputChange = useCallback((value) => {
    setMnemonic(value);
  }, []);

  return (
    <ForgotPassword
      onBack={handleBack}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      mnemonic={mnemonic}
    />
  );
}


export default ForgotPasswordContainer;
