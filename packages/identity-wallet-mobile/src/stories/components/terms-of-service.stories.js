import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, ScreenContainer } from '@selfkey/mobile-ui';
import { TermsOfService, TermsOfServiceAgreement } from '../../components';

const withModalButton = (ModalComponent) => (props) => {
  const [visible, setVisible] = useState(false);
  const handleClick = useCallback(() => setVisible(!visible));

  return (
    <ScreenContainer>
      <Button onPress={handleClick}>Open Modal</Button>
      <ModalComponent
        {...props}
        visible={visible}
        onClose={handleClick}
        onCancel={handleClick}
      />
    </ScreenContainer>
  );
};

const TOSModal = withModalButton(TermsOfService);
const TOSAgreementModal = withModalButton(TermsOfServiceAgreement);


storiesOf('components', module)
  .add('Terms Of Service', () => (
    <TOSModal />
  ))
  .add('Terms Of Service - Agreement', () => (
    <TOSAgreementModal />
  ));
