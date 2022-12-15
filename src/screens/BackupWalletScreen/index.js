import React, { useCallback, useState, useEffect } from 'react';
import { Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackupWallet } from './BackupWallet';
import ducks from 'core/modules';

const { operations, selectors } = ducks.createWallet;

// remove unused imports
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
    <React.Fragment>
      <BackupWallet
        mnemonicPhrase={mnemonic}
        onSubmit={handleSubmit}
        onCopyPhrase={handleCopyPhrase}
      />
    </React.Fragment>
  );
}

export default BackupWalletContainer;
