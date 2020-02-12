import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { Grid, Row, Col } from '@selfkey/mobile-ui';
import { SettingsMenu } from './SettingsMenu';

function SettingsScreenContainer(props) {
  const dispatch = useDispatch();
  const handleBackup = () => {
    navigate(Routes.CREATE_BACKUP);
  };

  const handleSwitchAccount = () => {
    navigate(Routes.WALLET_SELECTION);
  };

  const handlePrivacyPolicy = () => Linking.openURL('https://selfkey.org/privacy-policy/');
  const handleHelpAndSupport = () => Linking.openURL('https://help.selfkey.org/');

  return (
    <SettingsMenu
      onBackup={handleBackup}
      onSwitchAccount={handleSwitchAccount}
      onPrivacyPolicy={handlePrivacyPolicy}
      onHelpAndSupport={handleHelpAndSupport}
    />
  );
} 

export default SettingsScreenContainer;