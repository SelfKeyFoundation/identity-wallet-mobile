import React, { useContext, useMemo } from 'react';
import { TokenDetails } from '../../components';
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Picker } from 'react-native';
import styled from 'styled-components/native';
import {
  SKIcon,
  IconTouchId,
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
  DefinitionTitle,
} from '@selfkey/mobile-ui';
import RNPickerSelect from 'react-native-picker-select';
import { formatAddress } from '../../utils/address-utils';
const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const Header = styled.View`
  margin: 10px 20px 40px 20px;
`;

const Body = styled.ScrollView`
  margin: 0 20px;
  flex: 1;
`;

const Title = styled.Text`
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

const IconContainer = styled.View`
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

const SelectInput = styled.View`
  background: ${ props => props.hasError ? 'rgba(255,106,106,0.05)' : '#1B2229'};
  color: ${ props => props.hasError ? props.theme.colors.error : props.theme.colors.typography};
  border: 1px solid ${ props => props.hasError ? props.theme.colors.error : '#485A6E'};
  padding: 12px 15px;
  border-radius: 4px;
`;

const SelectText = styled.Text`
  color: ${props => props.selectedItem ? 'white' : '#697C95'};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 21px;
`;

const FormLabel = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 12px;
  font-family: ${props => props.theme.fonts.bold};
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const SelectIcon = styled.View`
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
const UseDifferentWallet = styled(Link)`
  text-transform: uppercase;
  width: 100%;
  font-size: 14px;  
  text-align: center;
`

const OrText = styled(DefinitionTitle)`
  color: white;
  font-size: 14px;
  text-align: center;
`


// TODO: Move to the Design System package
function Select(props) {
  const selectedItem = useMemo(() => {
    return props.items.find(item => item.value === props.selectedValue);
  }, [props.items, props.selectedValue]);

  const items = useMemo(() => {
    return props.items.map(item => ({
      ...item,
      color: 'black',
    }));
  }, [props.items]);

  return (
    <View>
      <FormLabel>{props.label}</FormLabel>
      <RNPickerSelect
        items={items}
        onValueChange={props.onValueChange}
        selectedValue={props.selectedValue}
      >
        <SelectInput hasError={props.error}>
          <SelectIcon>
            <SKIcon name="icon-expand_arrow-1" size={12} color="rgba(147,176,193,0.5)" />
          </SelectIcon>
          <SelectText selectedItem={selectedItem}>
            {
              selectedItem ? selectedItem.label : props.placeholder
            }
          </SelectText>
        </SelectInput>
      </RNPickerSelect>
      {
        (props.error && props.errorMessage) ? (
          <View style={{ marginBottom: 5, marginTop: 10 }}>
            <ErrorMessage>
              { props.errorMessage }
            </ErrorMessage>
          </View>
        ) : null
      }
    </View>
  )
}

const BiometryLabelMap = {
  FaceID: 'Face ID',
  TouchID: 'Touch ID',
  Fingerprint: 'Fingerprint',
};

function renderUnlockOptions(props) {
  const { biometricsEnabled, supportedBiometryType } = props;

  if (!supportedBiometryType || !biometricsEnabled) {
    return (
      <Row>
        <Col>
          <Button
            onPress={props.Submit}
            type="full-primary"
            isLoading={props.isLoading}
          >
            Unlock
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <Row alignItems="center" justifyContent="center" marginBottom={20}>
        <Col autoWidth>
          {
            supportedBiometryType === 'FaceID' ? (
              <SKIcon name="icon-face-id" color="#09A8BA" size={67} />
            ) : <IconTouchId />
          }
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onPress={props.onBiometricsUnlock}
            type="full-primary"
            isLoading={props.isLoading}
          >
            Unlock With { BiometryLabelMap[supportedBiometryType] }
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onPress={props.onSubmit}
            type="shell-primary"
            isLoading={props.isLoading}
          >
            Unlock with Password
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export function WalletSelection(props) {
  const theme = useContext(ThemeContext);
  const { isUnlockScreen, selectedWallet } = props;
  const isHDWallet = selectedWallet && selectedWallet.type === 'hd';

  return (
    <Container>
      <Header>
        {isUnlockScreen ? null :<IconContainer>
          <TouchableWithoutFeedback onPress={props.onBack}>
            <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
          </TouchableWithoutFeedback>
        </IconContainer> }
      </Header>
      <Body>
        <Row>
          <IconCol>
            <SKIcon name={isUnlockScreen ? 'icon-password' : 'icon-wallet'} color={theme.colors.primary} size={66} />
          </IconCol>
        </Row>
        <Row>
          <TitleCol>
            <PageTitle align="center">
              { isUnlockScreen ? 'Enter password to unlock your' : 'Choose a Different Wallet' }
            </PageTitle>
          </TitleCol>
        </Row>
        {isUnlockScreen ? <Row marginBottom={40}>
          <TitleCol noPadding>
            <PageTitle align="center">
              SelfKey Identity Wallet
            </PageTitle>
          </TitleCol>
        </Row> : null}
        {isUnlockScreen ? null : <Row>
          <TitleCol>
            <PageDescription>
              Select the wallet address and enter the password to unlock the wallet.
            </PageDescription>
          </TitleCol>
        </Row>}
        <Row>
          <Col>
            <Select
              label="Select a Wallet"
              error={props.error && props.error.wallet}
              errorMessage={props.error && props.error.wallet}
              onValueChange={props.onWalletChange}
              selectedValue={props.wallet}
              placeholder="Select a Wallet"
              items={props.wallets.map(w => ({
                label: w.name ? `${w.name} - ${formatAddress(w.address)}` : formatAddress(w.address),
                value: w.address,
              }))}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              error={props.error && props.error.password}
              errorMessage={props.error && props.error.password}
              value={props.password}
              placeholder="Password"
              label={isUnlockScreen ? 'Password' : "Enter your Password"}
              onChangeText={props.onPasswordChange}
              secureTextEntry={true}
              onSubmitEditing={props.onSubmit}
            />
          </Col>
        </Row>
        {
          isHDWallet ? (
            <Row>
              <Col autoWidth>
                <ForgotLink onPress={props.onForgot}>
                  Forgot?
                </ForgotLink>
              </Col>
            </Row>
          ) : null
        }
      </Body>
      <Footer>
        {
          renderUnlockOptions(props)
        }
        {
          isUnlockScreen ? (
            <React.Fragment>
              <Row>
                <Col>
                  <OrText>or</OrText>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableWithoutFeedback
                    onPress={props.onCreateWallet}
                  >
                    <UseDifferentWallet>
                      Create New Wallet
                    </UseDifferentWallet>
                  </TouchableWithoutFeedback>
                </Col>
              </Row>
            </React.Fragment>
          ) : null
        }
      </Footer>
    </Container>
  )
}