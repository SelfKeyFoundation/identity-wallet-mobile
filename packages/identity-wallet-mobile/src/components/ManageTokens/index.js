import React, { useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ManageTokens } from './ManageTokens';
import { HideTokenModal } from './HideTokenModal';
import ducks from '@selfkey/wallet-core/modules';

export * from './ManageTokens';
export * from './HideTokenModal';

// const tokens = [{
//   id: '<key-id>',
//   name: 'SelfKey',
//   code: 'Key',
//   amount: 0,
//   fiatAmount: 0,
//   fiatCurrency: 'usd',
//   colo22: '#2DA1F8'
// }, {
//   id: '<eth-id-1>',
//   name: 'Ethereum',
//   code: 'Eth',
//   amount: 0,
//   fiatAmount: 0,
//   fiatCurrency: 'usd',
//   color: '#9418DC'
// }, {
//   id: '<eth-id-2>',
//   name: 'Cordano',
//   code: 'ADA',
//   amount: 0,
//   fiatAmount: 0,
//   fiatCurrency: 'usd',
//   color: '#9418DC'
// }, {
//   id: '<eth-id-3>',
//   name: 'Augur',
//   code: 'AUG',
//   amount: 0,
//   fiatAmount: 0,
//   fiatCurrency: 'usd',
//   color: '#9418DC'
// }, {
//   id: '<eth-id-4>',
//   name: 'Golem',
//   code: 'GTM',
//   amount: 0,
//   fiatAmount: 0,
//   fiatCurrency: 'usd',
//   color: '#9418DC'
// }]

export function ManageTokensContainer(props) {
  const [tokenToRemove, setTokenToRemove] = useState(null);
  const handleRemove = useCallback((token) => {
    setTokenToRemove(token);
  }, []);
  const handleCancelRemove = useCallback(() => setTokenToRemove(null));
  const handleConfirmRemove = useCallback(() => {
    // TODO: dispatch event to remove the token, to be done in a separate issue
    setTokenToRemove(null);
  });

  const tokens = useSelector(ducks.wallet.selectors.getCustomTokens)
  const fiatAmount = useSelector(ducks.wallet.selectors.getCustomTokensFiatAmount);

  return (
    <ManageTokens
      tokens={tokens}
      onAdd={console.log}
      onRemove={handleRemove}
      tokensFiatAmount={fiatAmount}
      tokensFiatCurrency="usd"
      tokenToRemove={tokenToRemove}
    >
      <HideTokenModal
        visible={!!tokenToRemove}
        onClose={handleCancelRemove}
        onCancel={handleCancelRemove}
        onOk={handleConfirmRemove}
      />
    </ManageTokens>
  )
}