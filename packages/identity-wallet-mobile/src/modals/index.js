import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ducks from '@selfkey/wallet-core/modules';
import { Routes } from '@selfkey/wallet-core/navigation';

import TransactionDetailsModal from './TransactionDetailsModal';

const ModalMapper = {
  [Routes.MODAL_TRANSACTION_DETAILS]: TransactionDetailsModal,
}

export function ModalRoot() {
  const { modalId, params } = useSelector(ducks.modals.selectors.getCurrentModal);
  const dispatch = useDispatch();
  const CurrentModal = ModalMapper[modalId];
  const handleClose = useCallback(() => {
    dispatch(ducks.modals.actions.hideModal());
  }, []);

  if (!CurrentModal) {
    return null;
  }

  return (
    <CurrentModal
      onClose={handleClose}
      visible={true}
      params={params}
    />
  )
}