import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, Routes } from 'core/navigation';
import ducks from 'core/modules';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { Grid, Row, Col, Modal } from 'design-system';
import { SettingsMenu } from './SettingsMenu';
import * as Keychain from '../../rn-identity-vault/keychain';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';
import { WalletTracker } from '../../WalletTracker';
import { isDesktop } from '../../v2/platform-utils';
// const shell = require('electron').shell;

function SettingsScreenContainer(props) {
  const dispatch = useDispatch();
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);
  const [walletEnv, setWalletEnv] = useState({});
  const isHDWallet = useSelector(ducks.wallet.selectors.isHDWallet);
  const appSettings = useSelector(ducks.app.selectors.getGuideSettings);
  const wallet = useSelector(ducks.wallet.selectors.getWallet);
  const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);

  const handleBackup = () => {
    WalletTracker.trackEvent({
      category: `settings/backupButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.CREATE_BACKUP);
  };
  const [versionPressCount, setVersionPressCount] = useState(1);
  const togglePrivacyPolicy = () => {
    if (privacyPolicyVisible) {
      WalletTracker.trackEvent({
        category: `settings/closePrivacyPolicyButton`,
        action: 'press',
        level: 'machine'
      });
    } else {
      WalletTracker.trackEvent({
        category: `settings/showPrivacyPolicyButton`,
        action: 'press',
        level: 'machine'
      });
    }

    setPrivacyPolicyVisible(!privacyPolicyVisible)
  };

  const handleHelpAndSupport = () => {
    WalletTracker.trackEvent({
      category: `settings/helpAndSupportLink`,
      action: 'press',
      level: 'machine'
    });

    const url = 'https://help.selfkey.org/';

    if (isDesktop()) {
      // shell.openExternal(url)
      // window.require('electron').shell.openExternal(url);
      window.electronAPI.openUrl(url);
    } else {
      Linking.openURL(url)
    }
  };

  const handleSwitchAccount = () => {
    WalletTracker.trackEvent({
      category: `settings/switchAccountButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.WALLET_SELECTION);
  };

  const handleChangePassword = () => {
    WalletTracker.trackEvent({
      category: `settings/changePasswordButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.CHANGE_PASSWORD);
  };

  const handleDeveloperSettings = () => {
    WalletTracker.trackEvent({
      category: `settings/devSettingsButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.DEVELOPER_SETTINGS);
  };

  const handleRecoveryInformation = () => {
    WalletTracker.trackEvent({
      category: `settings/recoveryInformationButton`,
      action: 'press',
      level: 'machine'
    });

    navigate(Routes.RECOVERY_INFORMATION);
  };

  const handleVersionPress = () => {
    WalletTracker.trackEvent({
      category: `settings/versionButton`,
      action: 'press',
      level: 'machine'
    });

    if (walletEnv && walletEnv.isDevEnabled) {
      return;
    }

    if (versionPressCount > 15) {
      WalletTracker.trackEvent({
        category: `settings/devModeEnabled`,
        action: 'press',
        level: 'machine'
      });

      const updatedWalletEnv = {
        ...walletEnv,
        isDevEnabled: true,
      };

      setWalletEnv(updatedWalletEnv);
      Keychain.setItem('wallet-env', updatedWalletEnv);

      return;
    }

    setVersionPressCount(versionPressCount + 1);
  };

  const handleBiometricsChange = (value) => {
    dispatch(ducks.wallet.operations.setBiometricsEnabledOperation(value));
  };

  const handleDocumentScanner = () => navigate(Routes.DOCUMENT_SCANNER);

  const handleWalletConnect = () => navigate(Routes.WALLET_CONNECT);

  useEffect(() => {
    Keychain.getItem('wallet-env').then(walletEnv => {
      setWalletEnv(walletEnv || {});  
    });
  }, []);

  return (
    <React.Fragment>
      <SettingsMenu
        onBackup={handleBackup}
        onSwitchAccount={handleSwitchAccount}
        onPrivacyPolicy={togglePrivacyPolicy}
        onWalletConnect={handleWalletConnect}
        onHelpAndSupport={handleHelpAndSupport}
        onRecoveryInformation={isHDWallet && handleRecoveryInformation}
        onChangePassword={handleChangePassword}
        onVersionPress={handleVersionPress}
        onDeveloperSettings={handleDeveloperSettings}
        onBiometricsChange={handleBiometricsChange}
        onDocumentScanner={handleDocumentScanner}
        walletEnv={walletEnv}
        appSettings={appSettings}
        biometricsEnabled={!!wallet.biometricsEnabled}
        supportedBiometryType={supportedBiometryType}
      />
      <Modal
        visible={privacyPolicyVisible}
        title="Privacy Policy"
        cancelText="Close"
        onClose={togglePrivacyPolicy}
        onCancel={togglePrivacyPolicy}
      >
        <PrivacyPolicyContent />
      </Modal>
    </React.Fragment>
  );
} 

export default SettingsScreenContainer;