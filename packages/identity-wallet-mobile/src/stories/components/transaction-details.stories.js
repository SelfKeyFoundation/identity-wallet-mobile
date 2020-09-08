import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { bool } from '@storybook/addons-knobs';

import { Button, ScreenContainer } from 'design-system';
import { TransactionDetails } from '../../components';

storiesOf('components', module)
  .add('TransactionDetails', () => (
    <ScreenContainer>
      <TransactionDetails
        visible={true}
        token="rep"
        date={Date.now()}
        fiatAmount={3000.98}
        tokenAmount={16589}
        networkFee={0.00042}
        remainingBalance={4000}
        addressTo="0x4ac0d9ebd28118cab68a64ad8eb8c07c0120ebf8"
        addressFrom="0x4ac0d9ebd28118cab68a64ad8eb8c07c0120ebf8"
        status="Completed"
      />
    </ScreenContainer>
  ));
