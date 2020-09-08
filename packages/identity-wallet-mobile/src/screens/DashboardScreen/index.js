import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from './Dashboard';
import TermsOfServiceScreen from '../TermsOfServiceScreen';
import ducks from 'core/modules';
import { WalletTracker } from '../../WalletTracker';
import { Modal, Paragraph } from 'design-system';

const { operations, selectors } = ducks.wallet;

function DashboardContainer(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [showBiometricsModal, setShowBiomericsModal] = useState();
  const wallet = useSelector(selectors.getWallet);
  const dispatch = useDispatch();
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(operations.refreshWalletOperation(true));
    setRefreshing(false);
  }, []);
  const supportedBiometryType = useSelector(ducks.app.selectors.getSupportedBiometryType);
  const handleBiometricsSkip = () => {
    WalletTracker.trackEvent({
      category: `createWallet/biometricsModal`,
      action: 'skip',
      level: 'wallet'
    });
    dispatch(operations.setBiometricsEnabledOperation(false));
    setShowBiomericsModal(false);
  };

  const handleBiometricsOk = () => {
    WalletTracker.trackEvent({
      category: `createWallet/biometricsModal`,
      action: 'enable',
      level: 'wallet'
    });
    dispatch(operations.setBiometricsEnabledOperation(true));
    setShowBiomericsModal(false);
  };

  useEffect(() => {
    if (supportedBiometryType && wallet.biometricsEnabled === null) {
      setShowBiomericsModal(true);
    }
  }, []);

  return (
    <React.Fragment>
      <Dashboard
        refreshing={refreshing}
        onRefresh={handleRefresh}
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


export default DashboardContainer;
