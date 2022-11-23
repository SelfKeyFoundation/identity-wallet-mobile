import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePassword } from './CreatePassword';
import { useCreatePasswordController } from './useCreatePasswordController';
import modules from 'core/modules';
import { navigateBack, navigate, Routes } from 'core/navigation';
import { WalletTracker } from '../../WalletTracker';
import {getNavigationParam} from '../../v2/screen-utils';

const TRACKER_PAGE = 'chooseDifferentWallet';

const { operations, selectors } = modules.createWallet;

function CreatePasswordContainer(props) {
  const dispatch = useDispatch();
  const password = useSelector(selectors.getPassword);
  // Validation is handled using internal state
  // Submit will send the form data to redux
  const controller = useCreatePasswordController({
    initialValues: {
      password: password || '',
    },
    onSubmit: form => dispatch(
      operations.submitPasswordOperation(form)
    ),
  });

  const canReturn = getNavigationParam(props, 'canReturn', false);
  const canImport = getNavigationParam(props, 'canImport', true);
  const handleBack = useCallback(() => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/backButton`,
      action: 'press',
      level: 'machine'
    });

    navigateBack();
  });

  const handleImpotBackupFile = () => navigate(Routes.CREATE_WALLET_IMPORT_BACKUP);
  const handleImpotFromDesktop = () => navigate(Routes.CREATE_WALLET_IMPORT_FROM_DESKTOP);
  const handleImportFromMnemonic = () => {
    navigate(Routes.CREATE_WALLET_IMPORT_FROM_SEED);
  };

  return (
    <CreatePassword
      onBack={canReturn && handleBack}
      onChange={controller.handleChange}
      onSubmit={controller.handleSubmit}
      values={controller.values}
      errors={controller.errors}
      passwordStrength={controller.passwordStrength}
      onImportFromDesktop={handleImpotFromDesktop}
      onImportBackupFile={canImport && handleImpotBackupFile}
      onImportFromMnemonic={handleImportFromMnemonic}
    />
  );
}


export default CreatePasswordContainer;
