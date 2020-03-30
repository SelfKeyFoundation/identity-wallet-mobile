import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { Grid, Row, Col, Modal } from '@selfkey/mobile-ui';
import { SettingsMenu } from './SettingsMenu';
import * as Keychain from '../../rn-identity-vault/keychain';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

function SettingsScreenContainer(props) {
  const dispatch = useDispatch();
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);
  const isHDWallet = useSelector(ducks.wallet.selectors.isHDWallet);
  const handleBackup = () => {
    navigate(Routes.CREATE_BACKUP);
  };
  const [versionPressCount, setVersionPressCount] = useState(1);
  const togglePrivacyPolicy = () => setPrivacyPolicyVisible(!privacyPolicyVisible);
  const handleHelpAndSupport = () => Linking.openURL('https://help.selfkey.org/');
  const [walletEnv, setWalletEnv] = useState({});
  const handleSwitchAccount = () => navigate(Routes.WALLET_SELECTION);
  const handleChangePassword = () => navigate(Routes.CHANGE_PASSWORD);
  const handleDeveloperSettings = () => navigate(Routes.DEVELOPER_SETTINGS);
  const handleRecoveryInformation = () => navigate(Routes.RECOVERY_INFORMATION);
  const handleVersionPress = () => {
    if (walletEnv && walletEnv.isDevEnabled) {
      return;
    }

    if (versionPressCount > 15) {
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
        onHelpAndSupport={handleHelpAndSupport}
        onRecoveryInformation={isHDWallet && handleRecoveryInformation}
        onChangePassword={handleChangePassword}
        onVersionPress={handleVersionPress}
        onDeveloperSettings={handleDeveloperSettings}
        walletEnv={walletEnv}
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