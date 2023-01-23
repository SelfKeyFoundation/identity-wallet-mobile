import React, { useCallback, useState, useEffect } from 'react';
import { Clipboard, Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackupWallet } from './BackupWallet';
import ducks from 'core/modules';
import { Snackbar } from 'react-native-paper';
import { isDesktop } from '../../v2/platform-utils';

const { operations, selectors } = ducks.createWallet;

// remove unused imports
function BackupWalletContainer(props) {
  const dispatch = useDispatch();
  const mnemonic = useSelector(selectors.getMnemonicPhrase);
  const [snackBarMessage, setSnackMessage] = useState();
  const hideSnackBar = useCallback((message) => {
    setSnackMessage(undefined)
  }, []);
  const handleSubmit = useCallback(() => {
    dispatch(operations.submitWalletBackupOperation());
  }, []);

  const handleCopyPhrase = useCallback(() => {
    if (isDesktop()) {
      Clipboard.setString(mnemonic);
      setSnackMessage('Mnemonic copied!')
      return;
    }

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
      <Snackbar
        visible={!!snackBarMessage}
        onDismiss={hideSnackBar}
        duration={1000}
      >
        { snackBarMessage }
      </Snackbar>
    </React.Fragment>
  );
}

export default BackupWalletContainer;
