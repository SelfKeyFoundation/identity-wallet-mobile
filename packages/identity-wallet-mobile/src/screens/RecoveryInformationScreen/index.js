import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EnterPassword } from './EnterPassword';
import { MnemonicScreen } from './MnemonicScreen';
import { Share } from 'react-native';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'recoveryInformation';

function RecoveryInformationContainer(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [mnemonic, setMnemonic] = useState();
  const isHDWallet = useSelector(ducks.wallet.selectors.isHDWallet);
  const handleBack = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.APP_SETTINGS);
  }, []);
  const handleChange = useCallback(password => setPassword(password), []);
  const handleForgotPassword = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/forgotPasswordButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.UNLOCK_WALLET_FORGOT_PASSWORD)
  }, []);
  const handleSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mnemonic = await dispatch(ducks.wallet.operations.getRecoveryInformationOperation(password));
      WalletTracker.trackEvent({
        category: `${TRACKER_PAGE}/showMnemonic`,
        action: 'success',
        level: 'wallet'
      });
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

  const handleMnemonicBack = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'machine'
    });

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
        onBack={handleMnemonicBack}
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
      onForgot={isHDWallet && handleForgotPassword}
    />
  );
}


export default RecoveryInformationContainer;
