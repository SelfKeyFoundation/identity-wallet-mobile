import React, { useCallback } from 'react';
import { Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BackupWallet } from './BackupWallet';

import modules from '@selfkey/wallet-core/modules';

const { operations, selectors } = modules.createWallet;

function BackupWalletContainer(props) {
  const dispatch = useDispatch();
  const mnemonic = useSelector(selectors.getMnemonicPhrase);

  const handleSubmit = useCallback(() => {
    dispatch(operations.submitWalletBackupOperation());
  }, []);

  const handleCopyPhrase = useCallback(() => {
    Share.share({
      message: mnemonic,
    });
  }, [mnemonic]);

  return (
    <BackupWallet
      mnemonicPhrase={mnemonic}
      onSubmit={handleSubmit}
      onCopyPhrase={handleCopyPhrase}
    />
  );
}

export default BackupWalletContainer;
