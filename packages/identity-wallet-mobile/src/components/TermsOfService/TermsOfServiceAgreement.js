import React from 'react';
import { Modal } from 'design-system';
import { TermsOfServiceContent } from './TermsOfServiceContent';

export const TermsOfServiceAgreement = props => (
  <Modal
    { ...props }
    title="Terms of Service Agreement"
    okText="I Accept"
    cancelText="Cancel"
  >
    <TermsOfServiceContent />
  </Modal>
);

