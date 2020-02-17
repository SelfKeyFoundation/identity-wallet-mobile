import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateBack, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { Grid, Row, Col } from '@selfkey/mobile-ui';
import { DevSettings } from './DevSettings';
import * as Keychain from '../../rn-identity-vault/keychain';

function SettingsScreenContainer(props) {
  const dispatch = useDispatch();
  const [walletEnv, setWalletEnv] = useState({});

  useEffect(() => {
    Keychain.getItem('wallet-env').then(walletEnv => {
      setWalletEnv(walletEnv);  
    });
  }, []);

  const handleEnvChange = useCallback((selectedEnv) => {
    const updatedWalletEnv = {
      ...walletEnv,
      value: selectedEnv,
    };

    setWalletEnv(updatedWalletEnv)
    Keychain.setItem('wallet-env', updatedWalletEnv);
  }, [walletEnv]);

  return (
    <DevSettings
      onBack={navigateBack}
      selectedEnv={walletEnv && walletEnv.value}
      envs={[{
        label: 'Ropsten Testnet',
        value: 'dev'
      }, {
        label: 'Mainnet',
        value: 'prod'
      }]}
      onEnvChange={handleEnvChange}
    />
  );
} 

export default SettingsScreenContainer;