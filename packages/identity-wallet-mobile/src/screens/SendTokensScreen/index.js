import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
// import { Clipboard, Share, View } from 'react-native';
import { SendTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes, onNavigate } from '@selfkey/wallet-core/navigation';
import { Modal } from '@selfkey/mobile-ui';
import { SendStep } from './SendStep';
import { PendingStep } from './PendingStep';
import { SuccessStep } from './SuccessStep';
import { ErrorStep } from './ErrorStep';

const { operations, selectors } = modules.transaction;

function SendTokensScreen(props) {
  const [visible, setVisible] = useState(true);
  const status = useSelector(selectors.getStatus);
  const handleClose = useCallback((opts = { navigate: true }) => {
    setVisible(false);

    if (opts.navigate) {
      navigate(Routes.APP_DASHBOARD);
    }
  }, [setVisible]);

  useEffect(() => {
    setVisible(true);

    onNavigate((routeName) => {
      if (routeName === Routes.APP_SEND_TOKENS) {
        setVisible(true);
      }
    })
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
    case 'sent': {
      Renderer = SuccessStep;
      break;
    }
    case 'error': {
      Renderer = ErrorStep;
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
        <Renderer onCancel={handleClose} />
      </Modal>
    </React.Fragment>
  );
}


export default SendTokensScreen;
