import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, ScreenContainer } from 'design-system';
import { ReceiveTokens } from '../../components';

storiesOf('components', module)
  .add('ReceiveTokens', () => (
    <ScreenContainer>
      <ReceiveTokens
        visible={true}
        tokenSymbol="ETH"
        tokenAddress="0x4ac0d9ebd28118cab68a64ad8eb8c07c0120ebf8"
      />
    </ScreenContainer>
  ));
