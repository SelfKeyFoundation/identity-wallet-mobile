import React, { useCallback, useState, useEffect } from 'react';
import { Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { WalletTracker } from '../../WalletTracker';
import { BackupWallet } from './BackupWallet';
import { Modal, Paragraph } from '@selfkey/mobile-ui';
import ducks from '@selfkey/wallet-core/modules';

const { operations, selectors } = ducks.createWallet;

function BackupWalletContainer(props) {
  const dispatch = useDispatch();
  const mnemonic = useSelector(selectors.getMnemonicPhrase);
  const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);
  const [showBiometricsModal, setShowBiometricsModal] = useState(!!supportedBiometryType);

  useEffect(() => {
    setShowBiometricsModal(!!supportedBiometryType)
  }, [supportedBiometryType]);

  const handleSubmit = useCallback(() => {
    dispatch(operations.submitWalletBackupOperation());
  }, []);

  const handleCopyPhrase = useCallback(() => {
    Share.share({
      message: mnemonic,
    });
  }, [mnemonic]);

  const handleBiometricsSkip = () => {
    WalletTracker.trackEvent({
      category: `createWallet/biometricsModal`,
      action: 'skip',
      level: 'wallet'
    });

    setShowBiometricsModal(false);
  };

  const handleBiometricsOk = () => {
    WalletTracker.trackEvent({
      category: `createWallet/biometricsModal`,
      action: 'enable',
      level: 'wallet'
    });

    dispatch(ducks.createWallet.operations.setBiometricsEnabled(true));

    setShowBiometricsModal(false);
  };

  return (
    <React.Fragment>
      <BackupWallet
        mnemonicPhrase={mnemonic}
        onSubmit={handleSubmit}
        onCopyPhrase={handleCopyPhrase}
      />
      <Modal
        onClose={handleBiometricsSkip}
        onCancel={handleBiometricsSkip}
        onOk={handleBiometricsOk}
        visible={showBiometricsModal}
        title={`Enable ${supportedBiometryType}`}
        okText="Enable"
        cancelText="Skip"
      >
        <Paragraph>
          Enable {supportedBiometryType} to unlock your wallet
        </Paragraph>
      </Modal>
    </React.Fragment>
  );
}

export default BackupWalletContainer;
