import React, { useCallback } from 'react';
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

  console.log(mnemonic);

  return (
    <BackupWallet
      mnemonicPhrase={mnemonic}
      onSubmit={handleSubmit}
    />
  );
}

export default BackupWalletContainer;
