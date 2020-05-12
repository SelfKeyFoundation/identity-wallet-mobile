import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyProfile } from './MyProfile';
import modules from '@selfkey/wallet-core/modules';

const { operations, selectors } = modules.wallet;

function MyProfileContainer(props) {
  // const [refreshing, setRefreshing] = useState(false);
  // const dispatch = useDispatch();
  // const handleRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   await dispatch(operations.refreshWalletOperation(true));
  //   setRefreshing(false);
  // }, []);

  return (
    <React.Fragment>
      <MyProfile
        
      />
    </React.Fragment>
  );
}


export default MyProfileContainer;
