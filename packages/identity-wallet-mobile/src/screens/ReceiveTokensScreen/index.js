import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from '../DashboardScreen/Dashboard';
import { ReceiveTokens } from '../../components';
import modules from '@selfkey/wallet-core/modules';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

const { operations, selectors } = modules.wallet;

function ReceiveTokensContainer(props) {
  const tokenSymbol = props.navigation.getParam('tokenSymbol', 'ETH');
  const wallet = useSelector(selectors.getWallet);
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setVisible(false);
    navigate(Routes.APP_DASHBOARD);
  }, [setVisible]);

  useEffect(() => {
    setVisible(true);
  }, [props]);

  return (
    <React.Fragment>
      <Dashboard />
      <ReceiveTokens
        tokenSymbol={tokenSymbol}
        tokenAddress={wallet.address}
        onClose={handleClose}
        visible={visible}
      />
    </React.Fragment>
  );
}


export default ReceiveTokensContainer;
