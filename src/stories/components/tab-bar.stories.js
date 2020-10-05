


import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { bool } from '@storybook/addons-knobs';

import { Button, ScreenContainer } from 'design-system';
import { AppTabBar } from '../../components';
import { reduxMockDecorator } from 'core/utils/storybook-utils';
import { Routes } from 'core/navigation';

storiesOf('components', module)
  .addDecorator(reduxMockDecorator({
    
  }))
  .add('App Tab Bar', () => (
    <ScreenContainer>
      <AppTabBar
        navigation={{
          state: {
            routes: [{
              key: 'Routes.APP_DASHBOARD'
            }],
            index: Routes.APP_DASHBOARD
          }
        }}
      />
    </ScreenContainer>
  ));
