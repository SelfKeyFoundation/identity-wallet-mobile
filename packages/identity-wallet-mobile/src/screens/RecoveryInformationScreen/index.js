import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EnterPassword } from './EnterPassword';
import { MnemonicScreen } from './MnemonicScreen';
import { Share } from 'react-native';

import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

function RecoveryInformationContainer(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [mnemonic, setMnemonic] = useState();
  const handleBack = useCallback(() => navigate(Routes.APP_SETTINGS), []);
  const handleChange = useCallback(password => setPassword(password), []);
  const handleSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mnemonic = await dispatch(ducks.wallet.operations.getRecoveryInformationOperation(password));
      setMnemonic(mnemonic);
      setPassword(null);
    } catch(err) {
      if (err.message === 'wrong_password') {
        setError('Wrong password. Please try again.');
      } else {
        setError(err.message || err);
      }
    }

    setLoading(false);
  }, [isLoading, password]);

  const handleMnemonicSubmit = useCallback(() => {
    handleBack();
    setTimeout(() => {
      setMnemonic(null);
    }, 500)
  });

  const handleCopy= useCallback(() => Share.share({
    message: mnemonic,
  }), [mnemonic]);

  if (mnemonic) {
    return (
      <MnemonicScreen
        mnemonicPhrase={mnemonic}
        onCopyPhrase={handleCopy}
        onSubmit={handleMnemonicSubmit}
      />
    )
  }

  return (
    <EnterPassword
      onChange={handleChange}
      onSubmit={handleSubmit}
      password={password}
      error={error}
      onBack={handleBack}
      isLoading={isLoading}
    />
  );
}


export default RecoveryInformationContainer;
