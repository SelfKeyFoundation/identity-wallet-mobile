import { navigate, Routes } from 'core/navigation';
import { updateUserPreferences } from 'core/Storage';
import React from 'react';
import { KeyFiEligibilityStart } from './KeyFiEligibilityStart';

export default function KeyFiEligibilityStartContainer(props) {
  
  return (
    <KeyFiEligibilityStart
      onSkip={() => {
        updateUserPreferences({
          skipKeyFiEligibility: true,
        });
        navigate(Routes.APP_DASHBOARD);
      }}
      onStartStaking={() => {
        updateUserPreferences({
          skipKeyFiEligibility: true,
        });
        navigate(Routes.MARKETPLACE_PRODUCT, {
          sku: 'keyfi_kyc',
          categoryId: 'keyfi',
        })
      }}
    />
  );
}
