// @flow
import React from 'react';
import {
  Explanatory,
  SKIcon,
  Row,
  Col,
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

const IconCol = styled(Col)`
  width: 25px;
`;

const DescriptionCol = styled(Col)`
  width: 100%;
`;

interface ValidatioCheckProps {
  errors: string[],
  hasValue: boolean,
  theme: any,
  text: string,
  id: string,
};

export function ValidationCheck({ errors, hasValue, theme, text, id }: ValidatioCheckProps) {
  const hasError = !hasValue || errors.find(error => error === id);

  return (
    <Row>
      <IconCol>
        <SKIcon
          name="icon-shield-check"
          color={hasError ? theme.colors.disabled : theme.colors.success}
          size={16}
        />
      </IconCol>
      <DescriptionCol>
        <Explanatory>{text}</Explanatory>
      </DescriptionCol>
    </Row>
  );
}


