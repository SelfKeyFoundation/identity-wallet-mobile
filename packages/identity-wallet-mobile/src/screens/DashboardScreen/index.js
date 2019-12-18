import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from './Dashboard';
import TermsOfServiceScreen from '../TermsOfServiceScreen';
import modules from '@selfkey/wallet-core/modules';

const { operations, selectors } = modules.wallet;

function DashboardContainer(props) {

  return (
    <React.Fragment>
      <Dashboard />
    </React.Fragment>
  );
}


export default DashboardContainer;
