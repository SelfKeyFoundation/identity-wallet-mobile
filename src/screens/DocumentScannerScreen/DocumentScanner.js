import React, { useContext, useMemo } from 'react';
import { TokenDetails, SelectBox } from '../../components';
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Picker, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import {
  SKIcon,
  Row,
  Col,
  Grid,
  Button,
  TextInput,
  H3,
  Paragraph,
  ThemeContext,
  ErrorMessage,
  Link,
} from 'design-system';
import RNPickerSelect from 'react-native-picker-select';
import { formatAddress } from '../../utils/address-utils';

import ScannerTest from './ScannerTest';
import { BackButton } from '../../v2/components/BackButton';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const Header = styled(View)`
  margin: 10px 20px 40px 20px;
`;

const Body = styled(ScrollView)`
  margin: 0 20px;
  flex: 1;
`;

const Title = styled(Text)`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 24px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  position: absolute;
`;

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const IconContainer = styled(View)`
  position: absolute;
  top: -2px;
  left: -8px;
`;

const IconCol = styled(Col)`
  align-items: center;
`;

const TitleCol = styled(Col)`
  justify-content: center;
`;

const PageTitle = styled(H3)`
  text-align: center;
`;

const PageDescription = styled(Paragraph)`
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`;

const Footer = styled(Grid)`
  padding: 0 35px 35px 35px;
`

const SelectInput = styled(View)`
  background: ${ props => props.hasError ? 'rgba(255,106,106,0.05)' : '#1B2229'};
  color: ${ props => props.hasError ? props.theme.colors.error : props.theme.colors.typography};
  border: 1px solid ${ props => props.hasError ? props.theme.colors.error : '#485A6E'};
  padding: 12px 15px;
  border-radius: 4px;
`;

const SelectText = styled(Text)`
  color: ${props => props.selectedItem ? 'white' : '#697C95'};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 21px;
`;

const FormLabel = styled(Text)`
  color: ${props => props.theme.colors.typography};
  font-size: 12px;
  font-family: ${props => props.theme.fonts.bold};
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const SelectIcon = styled(View)`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const ForgotLink = styled(Link)`
  text-transform: uppercase;
  text-align: left;
  font-size: 13px;
  line-height: 19px;
`;

export function DocumentScanner(props) {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Header>
        <IconContainer>
          <BackButton onPress={props.onBack} />
        </IconContainer>
      </Header>
      <Body>
        <Row>
          <TitleCol>
            <PageTitle align="center">
              Document Scanner
            </PageTitle>
          </TitleCol>
        </Row>
        <Row style={{ height: '100%' }}>
          <ScannerTest />
        </Row>
      </Body>
    </Container>
  )
}