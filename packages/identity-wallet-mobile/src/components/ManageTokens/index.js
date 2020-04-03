import React, { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { ManageTokens } from './ManageTokens';
import { HideTokenModal } from './HideTokenModal';
import { AddTokenModal } from './AddTokenModal';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'manageTokens';

import ducks from '@selfkey/wallet-core/modules';

export * from './ManageTokens';
export * from './HideTokenModal';

export function ManageTokensContainer(props) {
  const [tokenToRemove, setTokenToRemove] = useState(null);
  const [showAdd, setShowAdd] = useState();
  const handleRemove = useCallback((token) => {
    setTokenToRemove(token);
  }, []);
  const dispatch = useDispatch();
  const handleCancelRemove = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/hideTokenModal/closeButton`,
      action: 'press',
      level: 'machine'
    });

    setTokenToRemove(null)
  });
  const handleConfirmRemove = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/hideTokenModal/confirmButton`,
      action: 'press',
      level: 'machine'
    });

    // TODO: dispatch event to remove the token, to be done in a separate issue
    dispatch(ducks.wallet.operations.hideTokenOperation({ contractAddress: tokenToRemove.address }))
      .then(() => setTokenToRemove(null));
  }, [tokenToRemove]);

  const handleShowAdd = useCallback(() => {
    setShowAdd(true);
  }, []);

  const handleCloseAdd= useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/addTokenModal/closeButton`,
      action: 'press',
      level: 'machine'
    });

    setShowAdd(false);
  }, []);

  const handleAdd = useCallback((contractAddress) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/addTokenModal/submitButton`,
      action: 'press',
      level: 'machine'
    });

    return dispatch(ducks.wallet.operations.addTokenOperation({ contractAddress }))
      .then(handleCloseAdd)
  });

  const handleTokenDetails = useCallback((tokenSymbol) => {
    navigate(Routes.TOKEN_DETAILS, {
      tokenId: tokenSymbol
    });
  }, []);

  const tokens = useSelector(ducks.wallet.selectors.getCustomTokens)
  const fiatAmount = useSelector(ducks.wallet.selectors.getCustomTokensFiatAmount);

  return (
    <ManageTokens
      tokens={tokens}
      onAdd={handleShowAdd}
      onRemove={handleRemove}
      onTokenDetails={handleTokenDetails}
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
      <AddTokenModal
        visible={showAdd}
        onAdd={handleAdd}
        onClose={handleCloseAdd}
        onCancel={handleCloseAdd}
      />
    </ManageTokens>
  )
}
