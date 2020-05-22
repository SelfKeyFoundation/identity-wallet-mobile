import React from 'react';
import { navigateBack } from '@selfkey/wallet-core/navigation';
import { DocumentScanner } from './DocumentScanner';

function DocumentScannerContainer(props) {
  return (
    <DocumentScanner
      onBack={navigateBack}
    />
  );
} 

export default DocumentScannerContainer;