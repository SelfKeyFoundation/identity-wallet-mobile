import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ducks from 'core/modules';
import { Routes } from 'core/navigation';

import TransactionDetailsModal from './TransactionDetailsModal';
import CreateSelfKeyIdModal from './CreateSelfKeyIdModal';

const ModalMapper = {
  [Routes.MODAL_TRANSACTION_DETAILS]: TransactionDetailsModal,
  [Routes.MODAL_CREATE_SELFKEY_ID]: CreateSelfKeyIdModal,
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