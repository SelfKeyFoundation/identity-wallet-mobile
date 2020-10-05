import { navigate, Routes } from 'core/navigation';
import React from 'react';
import { LearnHowToStake } from './LearnHowToStake';

export default function LearnHowToStakeContainer(props) {
  
  return (
    <LearnHowToStake
      onSkip={() => {
        // dispatch operation
        navigate(Routes.APP_DASHBOARD);
      }}
      onStartStaking={() => {
        navigate(Routes.APP_STAKING);
      }}
    />
  );
}
