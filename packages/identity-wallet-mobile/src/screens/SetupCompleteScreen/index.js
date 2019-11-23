import React, { useEffect } from 'react';
import { SetupCompleteScreen } from './SetupCompleteScreen';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

function SetupCompleteContainer(props) {
  useEffect(() => {
    setTimeout(() => {
      navigate(Routes.APP_DASHBOARD);
    }, 2500);
  }, []);

  return (
    <SetupCompleteScreen/>
  );
}


export default SetupCompleteContainer;
