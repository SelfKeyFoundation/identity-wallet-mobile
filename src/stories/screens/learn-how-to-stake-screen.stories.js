
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { LearnHowToStake } from 'screens/LearnHowToStakeScreen/LearnHowToStake';

storiesOf('Stake', module)
  .add('Learn how to stake - Static', () => (
    <LearnHowToStake
      onSkip={() => console.log('skip press')}
      onStartStaking={() => console.log('start staking press')}
    />
  ));

  
