import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ImportFromDesktop } from './ImportFromDesktop';
import { ImportMessage } from './ImportMessage';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import { Modal } from '@selfkey/mobile-ui';
import ducks from '@selfkey/wallet-core/modules';
import { PasswordScreen } from './PasswordScreen';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'importFromDesktop';

function ImportFromDesktopContainer(props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleQRCode = (value) => setData(value);
  const handlePassword = value => setPassword(value);
  const handleConfirmModal = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/stepsConfirm`,
      action: 'press',
      level: 'system'
    });

    setShowModal(false);
  };
  const handleBackPassword = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/password/backButton`,
      action: 'press',
      level: 'system'
    });

    setPassword(null);
    setData(null);
  };

  const handleSubmitPassword = async () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/password/submitButton`,
      action: 'press',
      level: 'system'
    });

    if (!password) {
      setError('Password is required');
      return;
    }

    setError(null);
    setLoading(true);

    setTimeout(() => {
      dispatch(ducks.createWallet.operations.importFromDesktopOperation(data, password))
        .catch(err => {
          if (err && err.message === 'wallet_exists') {
            setError('Wallet already exists');
          } else {
            setError('Incorrect password')
          }
        })
        .finally(() => setLoading(false))
    }, 500);
  };

  const handleBack = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'system'
    });

    navigateBack();
  }

  useEffect(() => {
    setShowModal(true);
  }, []);

  if (data || showModal) {
    return (
      <React.Fragment>
        <Modal
          visible={showModal}
          onClose={handleBack}
          onCancel={handleBack}
          okText="Import Wallet"
          cancelText="Cancel"
          onOk={handleConfirmModal}
          title="Import from Desktop Application"
        >
          <ImportMessage />
        </Modal>
        <PasswordScreen
          error={error}
          confirmText="Import Wallet"
          headerTitle="Import wallet from desktop"
          title="Enter password you set in the desktop app"
          titleLine2="to import it on your mobile device"
          onChange={handlePassword}
          onSubmit={handleSubmitPassword}
          onBack={handleBackPassword}
          password={password}
          isLoading={isLoading}
        />
      </React.Fragment>
    );
  }

  return (
    <ImportFromDesktop
      onSuccess={handleQRCode}
      onClose={navigateBack}
    />
  );
}

export default ImportFromDesktopContainer;
