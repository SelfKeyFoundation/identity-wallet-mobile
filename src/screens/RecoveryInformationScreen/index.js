import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EnterPassword } from './EnterPassword';
import { MnemonicScreen } from './MnemonicScreen';
import { Clipboard, Share } from 'react-native';
import { navigate, Routes } from 'core/navigation';
import ducks from 'core/modules';
import { WalletTracker } from '../../WalletTracker';
import { isDesktop } from '../../v2/platform-utils';
import { Snackbar } from 'react-native-paper';

const TRACKER_PAGE = 'recoveryInformation';

function RecoveryInformationContainer(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isBiometricsLoading, setBiometricsLoading] = useState();
  const [error, setError] = useState();
  const [mnemonic, setMnemonic] = useState();
  const isHDWallet = useSelector(ducks.wallet.selectors.isHDWallet);
  const wallet = useSelector(ducks.wallet.selectors.getWallet);
  const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);
  const [snackBarMessage, setSnackMessage] = useState();
  const hideSnackBar = useCallback((message) => {
    setSnackMessage(undefined)
  }, []);

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
  const handleSubmit = useCallback(async (biometrics) => {
    if (isLoading) {
      return;
    }

    if (biometrics) {
      setBiometricsLoading(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const mnemonic = await dispatch(ducks.wallet.operations.getRecoveryInformationOperation({
        password: password,
        biometrics: biometrics,
      }));

      WalletTracker.trackEvent({
        category: `${TRACKER_PAGE}/showMnemonic`,
        action: 'success',
        level: 'wallet'
      });
      setMnemonic(mnemonic);
      setPassword(null);
    } catch (err) {
      if (!biometrics) {
        if (err.message === 'wrong_password') {
          setError('Wrong password. Please try again.');
        } else {
          setError(err.message || err);
        }
      }
    }

    if (biometrics) {
      setBiometricsLoading(false);
    } else {
      setLoading(false);
    }
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

  const handleCopy = useCallback(() => {
    if (isDesktop()) {
      Clipboard.setString(mnemonic);
      setSnackMessage('Mnemonic copied!')
      return;
    }

    Share.share({
      message: mnemonic,
    })

    
  }, [mnemonic]);

  if (mnemonic) {
    return (
      <>
        <MnemonicScreen
          mnemonicPhrase={mnemonic}
          onCopyPhrase={handleCopy}
          onBack={handleMnemonicBack}
        />
        <Snackbar
          visible={!!snackBarMessage}
          onDismiss={hideSnackBar}
          duration={1000}
        >
          { snackBarMessage }
        </Snackbar>
      </>
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
      supportedBiometryType={supportedBiometryType}
      biometricsEnabled={wallet.biometricsEnabled}
      isBiometricsLoading={isBiometricsLoading}
    />
  );
}


export default RecoveryInformationContainer;
