import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TermsOfService, TermsOfServiceAgreement } from '../../components';
import modules from '@selfkey/wallet-core/modules';

const { operations, selectors } = modules.app;

function TermsOfServiceContainer(props) {
  const dispatch = useDispatch();
  const [displayAgreement, setDisplayAggrement] = useState(true);
  const handleAgreementAccept = useCallback(() => dispatch(operations.acceptTermsOperation()));
  const handleAgreementReject = useCallback(() => dispatch(operations.rejectTermsOperation()));
  const toggleAgreement = useCallback(() => setDisplayAggrement(!displayAgreement), [displayAgreement]);

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
