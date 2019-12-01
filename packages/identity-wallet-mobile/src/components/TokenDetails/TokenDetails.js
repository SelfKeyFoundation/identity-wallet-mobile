
// @flow
import React, { useContext } from 'react';
import {
  ScreenContainer,
  TextInput,
  SKIcon,
  Paragraph,
  ThemeContext,
  Container,
  Grid,
  Row,
  Col,
  Button,
  H3,
  H4,
  Alert,
} from '@selfkey/mobile-ui';

import styled from 'styled-components/native';

export interface TokenDetailsProps {
  mnemonicPhrase: string;
  onSubmit: () => void;
}

const ContentGrid = styled(Grid)`
  flex: 1;
  min-height: 450px;
`;

export function TokenDetails(props: TokenDetailsProps) {
  const theme = useContext(ThemeContext);

  return (
    <ScreenContainer>
      <Paragraph>Testinngggg</Paragraph>
      <Paragraph>Testinngggg</Paragraph>
      <Paragraph>Testinngggg</Paragraph>
      <Paragraph>Testinngggg</Paragraph>
      <Paragraph>Testinngggg</Paragraph>
    </ScreenContainer>
  );
}
