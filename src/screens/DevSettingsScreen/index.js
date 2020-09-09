import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateBack, Routes } from 'core/navigation';
import ducks from 'core/modules';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { Grid, Row, Col } from 'design-system';
import { DevSettings } from './DevSettings';
import * as Keychain from '../../rn-identity-vault/keychain';
import modules from 'core/modules';

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

  const handleDeleteWallet = useCallback(() => {
    dispatch(ducks.wallet.operations.removeWalletOperation());
  });

  const handleClearDID = () => dispatch(ducks.identity.operations.clearDIDOperation());

  return (
    <DevSettings
      onBack={navigateBack}
      selectedEnv={walletEnv && walletEnv.value}
      onDeleteWallet={handleDeleteWallet}
      onClearDID={handleClearDID}
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