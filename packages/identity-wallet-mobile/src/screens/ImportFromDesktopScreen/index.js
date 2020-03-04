import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImportFromDesktop } from './ImportFromDesktop';
import { ImportMessage } from './ImportMessage';
import { navigate, Routes, navigateBack } from '@selfkey/wallet-core/navigation';
import { Modal } from '@selfkey/mobile-ui';
import ducks from '@selfkey/wallet-core/modules';

function ImportFromDesktopContainer(props) {
  const [showModal, setShowModal] = useState(true);

  const handleQRCode = (value) => {
    console.log('QRCode', value);
  };

  const handleConfirmModal = () => setShowModal(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  console.log('test')

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