import React from 'react';
import { Modal, Paragraph } from 'design-system';

export const TermsOfService = props => (
  <Modal
    { ...props }
    title="Acceptance Needed"
    okText="Return to TOS"
    cancelText="Close App"
  >
    <Paragraph>
      You will need to accept the Terms of Service in order to use the SelfKey Identity Wallet or you will be unable to proceed.
    </Paragraph>
    <Paragraph>
      Return to the TOS agreement below or exit and close the application.
    </Paragraph>
  </Modal>
);

