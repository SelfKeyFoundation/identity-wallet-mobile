import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImportWalletBackup } from './ImportWalletBackup';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

function ImportWalletBackupContainer(props) {
  
  return (
    <ImportWalletBackup

    />
  );
} 

export default ImportWalletBackupContainer;