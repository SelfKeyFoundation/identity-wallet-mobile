import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TermsOfService, TermsOfServiceAgreement } from '../../components';
import modules from 'core/modules';
import { WalletTracker } from '../../WalletTracker';

const { operations, selectors } = modules.app;

function TermsOfServiceContainer(props) {
  const dispatch = useDispatch();
  const [displayAgreement, setDisplayAggrement] = useState(true);
  const handleAgreementAccept = useCallback(() => {
    WalletTracker.trackEvent({
      category: `termsOfService/iAcceptButton`,
      action: 'press',
      level: 'machine'
    });
    dispatch(operations.acceptTermsOperation());
  });
  const handleAgreementReject = useCallback(() => {
    WalletTracker.trackEvent({
      category: `termsOfService/closeAppButton`,
      action: 'press',
      level: 'machine'
    });

    dispatch(operations.rejectTermsOperation());
  });
  const toggleAgreement = useCallback(() => {
    if (!displayAgreement) {
      WalletTracker.trackEvent({
        category: `termsOfService/returnToTOSButton`,
        action: 'press',
        level: 'machine'
      });
    } else {
      WalletTracker.trackEvent({
        category: `termsOfService/cancelButton`,
        action: 'press',
        level: 'machine'
      });
    }

    setDisplayAggrement(!displayAgreement);
  }, [displayAgreement]);

  useEffect(() => {
    WalletTracker.trackEvent({
      category: `termsOfService/modal`,
      action: 'show',
      level: 'machine'
    });
  }, []);

  return (
    <React.Fragment>
      <TermsOfServiceAgreement
        visible={displayAgreement}
        onOk={handleAgreementAccept}
        onCancel={toggleAgreement}
        onClose={toggleAgreement}
      />
      <TermsOfService
        visible={!displayAgreement}
        onOk={toggleAgreement}
        onCancel={handleAgreementReject}
        onClose={toggleAgreement}
      />
    </React.Fragment>
  );
}

const withTermsCheck = Wrapper => props => {
  const isTermsAccepeted = useSelector(selectors.isTermsAccepeted);

  if (isTermsAccepeted) {
    return null;
  }

  return <Wrapper {...props} />;
}


export default withTermsCheck(TermsOfServiceContainer);
