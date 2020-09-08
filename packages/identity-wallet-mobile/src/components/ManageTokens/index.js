import React, { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate, Routes } from 'core/navigation';
import { ManageTokens } from './ManageTokens';
import { HideTokenModal } from './HideTokenModal';
import { AddTokenModal } from './AddTokenModal';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'manageTokens';

import ducks from 'core/modules';

export * from './ManageTokens';
export * from './HideTokenModal';

export function ManageTokensContainer(props) {
  const [tokenToRemove, setTokenToRemove] = useState(null);
  const [showAdd, setShowAdd] = useState();
  const handleRemove = (token) => setTokenToRemove(token);
  const dispatch = useDispatch();
  const handleCancelRemove = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/hideTokenModal/closeButton`,
      action: 'press',
      level: 'machine'
    });

    setTokenToRemove(null)
  };

  const handleConfirmRemove = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/hideTokenModal/confirmButton`,
      action: 'press',
      level: 'machine'
    });

    if (!tokenToRemove) {
      return;
    }

    dispatch(ducks.wallet.operations.hideTokenOperation({ contractAddress: tokenToRemove.address }))
      .then(() => setTokenToRemove(null));
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd= () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/addTokenModal/closeButton`,
      action: 'press',
      level: 'machine'
    });

    setShowAdd(false);
  };

  const handleAdd = (contractAddress) => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/addTokenModal/submitButton`,
      action: 'press',
      level: 'machine'
    });

    return dispatch(ducks.wallet.operations.addTokenOperation({ contractAddress }))
      .then(handleCloseAdd)
  };

  const handleTokenDetails = (tokenSymbol) => {
    navigate(Routes.TOKEN_DETAILS, {
      tokenId: tokenSymbol
    });
  };

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
