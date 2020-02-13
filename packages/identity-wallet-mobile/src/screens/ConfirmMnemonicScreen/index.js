import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmMnemonic } from './ConfirmMnemonic';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

const { operations, selectors } = ducks.createWallet;

function ConfirmMnemonicContainer(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const mnemonic = useSelector(selectors.getShuffledMnemonic);
  const mnemonicConfirmation = useSelector(selectors.getMnemonicConfirmation);
  const shuffledMnemonic = useSelector(selectors.getShuffledMnemonic);
  const errorMessage = useSelector(selectors.getConfirmationError);

  const handleBack = useCallback(() => {
    navigate(Routes.CREATE_WALLET_BACKUP);
  });

  const handleSubmit = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      dispatch(operations.submitConfirmationOperation())
        .finally(() => setLoading(false));
    }, 100);
  });

  const handleWordPress = useCallback(index => {
    dispatch(operations.addConfirmationWord(index));
  });

  const handleClear = useCallback(() => {
    dispatch(operations.clearConfirmation());
  });

  return (
    <ConfirmMnemonic
      onWordPress={handleWordPress}
      mnemonicConfirmation={mnemonicConfirmation}
      shuffledMnemonic={shuffledMnemonic}
      mnemonic={mnemonic}
      onClear={handleClear}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onBack={handleBack}
      errorMessage={errorMessage}
    />
  );
}


export default ConfirmMnemonicContainer;
