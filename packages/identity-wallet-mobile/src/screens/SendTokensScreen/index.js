import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
// import { Clipboard, Share, View } from 'react-native';
import { SendTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { Modal } from '@selfkey/mobile-ui';
import { SendStep } from './SendStep';
import { PendingStep } from './PendingStep';

const { operations, selectors } = modules.transaction;

function SendTokensScreen(props) {
  const [visible, setVisible] = useState(true);
  const status = useSelector(selectors.getStatus);
  const handleClose = useCallback(() => {
    setVisible(false);
    navigate(Routes.APP_DASHBOARD);
  }, [setVisible]);

  useEffect(() => {
    setVisible(true);
  }, [props]);

  let Renderer;

  switch(status) {
    case 'in_progress': {
      Renderer = SendStep;
      break;
    }
    case 'pending': {
      Renderer = PendingStep;
      break;
    }
    case 'error': {
      Renderer = SendStep;
      break;
    }
  }

  return (
    <React.Fragment>
      <Dashboard />
      <Modal
        visible={visible}
        onClose={handleClose}
        title="Send Custom Tokens"
        footer={null}
        noBodyPadding
      >
        <Renderer onClose={handleClose}/>
      </Modal>
    </React.Fragment>
  );
}


export default SendTokensScreen;
