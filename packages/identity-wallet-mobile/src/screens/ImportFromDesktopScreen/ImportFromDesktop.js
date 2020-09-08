import React, { useContext } from 'react';
import { TokenDetails } from '../../components';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { ScanQR } from '@selfkey/identity-wallet-mobile/src/components';
import {
  SKIcon,
  Row,
  Col,
  H3,
  Paragraph,
  Grid,
  Alert,
  Button,
  ThemeContext,
  TextInput
} from 'design-system';

export function ImportFromDesktop(props) {
  return (
    <ScanQR
      title="Import wallet from desktop"
      description="Scan the QR Code from Desktop App"
      smallDescription="Place Code inside the box."
      onSuccess={props.onSuccess}
      onClose={props.onClose}
    />
  );
}
