import React from 'react';
import { Modal, Paragraph } from '@selfkey/mobile-ui';

export const HideTokenModal = props => (
  <Modal
    { ...props }
    title="Hide Token"
    okText="OK, Hide"
    cancelText="Cancel"
  >
    <Paragraph>
      Hiding tokens from this list only disables them from the display, and does not impact their status on the Ethereum blockchain.
    </Paragraph>
  </Modal>
);

