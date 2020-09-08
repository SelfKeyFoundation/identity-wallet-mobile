import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
// import { Clipboard, Share, View } from 'react-native';
import { SendTokens } from '../../components';
import modules from 'core/modules';
import { navigate, Routes, onNavigate } from 'core/navigation';
import { Modal } from 'design-system';
import { SendStep } from './SendStep';
import { PendingStep } from './PendingStep';
import { SuccessStep } from './SuccessStep';
import { ErrorStep } from './ErrorStep';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'sendTokens';

const { operations, selectors } = modules.transaction;

function SendTokensScreen(props) {
  const dispatch = useDispatch();
  const status = useSelector(selectors.getStatus);
  const visible = useSelector(modules.app.selectors.showSendTokensModal);
  const handleClose = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/closeButton`,
      action: 'press',
      level: 'wallet'
    });

    dispatch(modules.app.operations.showSendTokensModal(false));
  }, []);

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
