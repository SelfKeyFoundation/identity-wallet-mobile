import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ImportFromDesktop } from './ImportFromDesktop';
import { ImportMessage } from './ImportMessage';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import { Modal } from '@selfkey/mobile-ui';
import ducks from '@selfkey/wallet-core/modules';
import { PasswordScreen } from './PasswordScreen';

const keystore = 'eyJ2ZXJzaW9uIjozLCJpZCI6IjJmM2QxNTkxLTNhYjYtNDI3MC05YjYzLWQ5NGUxYWVhZDk2ZSIsImFkZHJlc3MiOiJiNGQ5NjUzYjlkOWZlZjhjZjM0MDdiZmY2ZDIxZGIyNWQ3NGRkZGM2IiwiY3J5cHRvIjp7ImNpcGhlcnRleHQiOiIzOGQzNTA3Zjk5OTY0ZGY3ODc0NGIyMWU1YmNmZTgxZjVlOWEzMDA1YTExMTc1YmFmYmJmZDQ1MWRjMTgxY2ViIiwiY2lwaGVycGFyYW1zIjp7Iml2IjoiZDY1ZTdhMGYyZTVmYjM1NGI0ODQzNDM5MjczMzE2YjEifSwiY2lwaGVyIjoiYWVzLTEyOC1jdHIiLCJrZGYiOiJzY3J5cHQiLCJrZGZwYXJhbXMiOnsiZGtsZW4iOjMyLCJzYWx0IjoiOTkwZWI5NGMyYmE5YzUwMGYwMTYwM2RjZTEwNDIwMGQ1N2EwZGU4NTU4NWY5MWUxYzUwMmJkMjczYTE1YWM1NiIsIm4iOjgxOTIsInIiOjgsInAiOjF9LCJtYWMiOiI0MWEwODFjMjljN2MzNDYzOGU4Zjk5Y2ZlZDU3NGM3YzBmODAzOWU4ZWYyNWRlMGQ5NDc2ZDJjZDJjZmFjMWY5In19';

function ImportFromDesktopContainer(props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(keystore);
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleQRCode = (value) => setData(value);
  const handlePassword = value => setPassword(value);
  const handleConfirmModal = () => setShowModal(false);
  const handleBackPassword = () => {
    setPassword(null);
    setData(null);
  };
  const handleSubmitPassword = () => {
    if (!password) {
      setError('Password is required');
      return;
    }

    setError(null);
    setLoading(true);

    // submit data and password to be decrypted
    // console.log('submit password', password);

    dispatch(ducks.createWallet.operations.importFromDesktopOperation(data, password));
    setLoading(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  if (data) {
    return (
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
    );
  }

  return (
    <React.Fragment>
      <Modal
        visible={showModal}
        onClose={navigateBack}
        onCancel={navigateBack}
        okText="Import Wallet"
        cancelText="Cancel"
        onOk={handleConfirmModal}
        title="Import from Desktop Application"
      >
        <ImportMessage />
      </Modal>
      <ImportFromDesktop
        onSuccess={handleQRCode}
        onClose={navigateBack}
      />
    </React.Fragment>
  );
}

export default ImportFromDesktopContainer;
