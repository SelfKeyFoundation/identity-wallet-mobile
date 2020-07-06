import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImportFromSeed } from './ImportFromSeed';
import ducks from '@selfkey/wallet-core/modules';
import { navigateBack, navigate, Routes } from '@selfkey/wallet-core/navigation';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'chooseDifferentWallet';
const { operations, selectors } = ducks.createWallet;

function ImportFromSeedContainer(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const mnemonicPhrase = useSelector(selectors.getMnemonicPhrase);
  // Validation is handled using internal state
  // Submit will send the form data to redux
  const handleBack = useCallback(() => {
    dispatch(operations.setMnemonicPhrase(null));
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'machine'
    });
    navigateBack();
  });

  const handleMnemonicChange = (value) => {
    dispatch(operations.setMnemonicPhrase(value));
  };

  const handleSubmit = () => {
    setError(null);
    setLoading(true);

    dispatch(operations.importFromSeedSubmitOperation())
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <ImportFromSeed
      onBack={handleBack}
      mnemonicPhrase={mnemonicPhrase}
      error={error}
      isLoading={isLoading}
      onMnemonicChange={handleMnemonicChange}
      onSubmit={handleSubmit}
    />
  );
}

export default ImportFromSeedContainer;
