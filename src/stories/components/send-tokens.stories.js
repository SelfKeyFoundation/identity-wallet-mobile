import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { bool } from '@storybook/addons-knobs';

import { Button, ScreenContainer } from 'design-system';
import { SendTokens } from '../../components';

storiesOf('components', module)
  .add('SendTokens', () => (
    <ScreenContainer>
      <SendTokens
        tokenDetails={{
          symbol: 'eth',
          name: 'Ethereum',
          amount: 1.4
        }}
        visible={true}
        errors={{
          // transaction: 'Transaction Error: You don\'t have enough Ethereum (ETH) for the network transaction fee. Please transfer ETH to your wallet and try again.',
          // address: 'Invalid address. Please check and try again'
        }}
        onTransactionFeeSelect={option => {
          console.log(option)
        }}
        onQRCodePress={() => {
          console.log('QR Code');
        }}
        onAdvancedPress={() => {
          console.log('Advanced');
        }}
        onCancel={() => {
          console.log('Cancel');
        }}
        onSend={() => {
          console.log('Send');
        }}
        onMaxPress={() => {
          console.log('Max');
        }}
        onClose={() => {
          console.log('Close');
        }}
        advancedMode={true}
        onChange={(fieldName, value) => console.log(fieldName, value)}
        data={{
          address: '0x4ac0d9ebd28118cab68a64ad8eb8c07c0120ebf8',
          amount: '0.001',
          // computed value
          fiatAmount: 34,
          transactionFee: 'normal',
          token: 'eth',
        }}
        tokens={[
          {
            symbol: 'eth',
            name: 'Ethereum',
            amount: 4987324,
          }
        ]}
        transactionFeeOptions={[{
          id: 'slow',
          name: 'Slow',
          ethAmount: 0.00047,
          fiatAmount: 0.1,
          time: '5-30 min',
        }, {
          id: 'normal',
          name: 'Normal',
          ethAmount: 0.0023,
          fiatAmount: 0.5,
          time: '2-5 min',
        }, {
          id: 'fast',
          name: 'Fast',
          ethAmount: 0.0047,
          fiatAmount: 1.00,
          time: '< 2 min',
        }]}
      />
    </ScreenContainer>
  ));
