import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from './Dashboard';
import TermsOfServiceScreen from '../TermsOfServiceScreen';
import modules from '@selfkey/wallet-core/modules';

const { operations, selectors } = modules.wallet;

function DashboardContainer(props) {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(operations.refreshWalletOperation(true));
    setRefreshing(false);
  }, []);

  return (
    <React.Fragment>
      <Dashboard
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </React.Fragment>
  );
}


export default DashboardContainer;
