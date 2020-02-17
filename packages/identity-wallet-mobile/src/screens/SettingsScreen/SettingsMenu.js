import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import {
  SKIcon,
  Row,
  Col,
  DefinitionTitle,
} from '@selfkey/mobile-ui';
import APP_VERSION from '@selfkey/identity-wallet-mobile/app-version.json';
import { getCurrentEnv } from '@selfkey/configs';

function getVersion() {
  const env = getCurrentEnv();
  const version = APP_VERSION.number + (env !== 'prod' ? ` (${env})` : '');
  return `${version}`;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;
  
const Header = styled.View`
  margin: 10px 20px 20px 20px;
`;

const Body = styled.ScrollView`
  margin: 0px;
`;


const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 24px;
  width: 100%;
  text-align: center;
`;

const MenuRightText = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 15px;
`;


const SectionTitle = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 19px;
`;

const OptionTitle = styled(DefinitionTitle)`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 24px;
`

const MenuItemRow = styled(Row)`
  background: #262F39;
`

const MenuItemWrapper = styled(Col)`
  border-width: 0;
  border-bottom-width: ${props => props.hasBorder ? '1px' : '0'};
  border-color: #475768;
  border-style: solid;
  margin-left: 20px;
  margin-bottom: ${props => props.hasBorder ? '1px' : '0'};
`;

function MenuItem({ hasBorder, children, onPress, menuControl }) {
  return (
    <MenuItemRow>
      <TouchableWithoutFeedback onPress={onPress}>
        <MenuItemWrapper hasBorder={hasBorder}>
          <Row>
            <Col noPadding>
              <OptionTitle>{ children }</OptionTitle>
            </Col>
            <Col autoWidth>
              {
                menuControl ? menuControl : <SKIcon name="arrow-right" size={13} color="#93B0C1" />
              }
            </Col>
            <Col autoWidth style={{ width: 20 }}/>
          </Row>
        </MenuItemWrapper>
      </TouchableWithoutFeedback>
    </MenuItemRow>
  )
}

export function SettingsMenu(props) {

  return (
    <Container>
      <Header>
        <Title>Settings</Title>
      </Header>
      <Body>
        <Row>
          <Col paddingLeft={20}>
            <SectionTitle>Wallet Information</SectionTitle>
          </Col>
        </Row>
        <MenuItem hasBorder onPress={props.onRecoveryInformation}>
          Recovery Information
        </MenuItem>
        <MenuItem onPress={props.onBackup}>
          Backup
        </MenuItem>

        <Row marginTop={20}>
          <Col paddingLeft={20}>
            <SectionTitle>Choose Wallet</SectionTitle>
          </Col>
        </Row>
        <MenuItem onPress={props.onSwitchAccount}>
          Switch Accounts
        </MenuItem>

        <Row marginTop={20}>
          <Col paddingLeft={20}>
            <SectionTitle>Security Settings</SectionTitle>
          </Col>
        </Row>
        <MenuItem>
          Change Passcode
        </MenuItem>

        <Row marginTop={20}>
          <Col paddingLeft={20}>
            <SectionTitle>Support</SectionTitle>
          </Col>
        </Row>
        <MenuItem hasBorder onPress={props.onPrivacyPolicy}>
          Privacy Policy
        </MenuItem>
        <MenuItem hasBorder onPress={props.onHelpAndSupport}>
          Help & Support
        </MenuItem>
        {props.walletEnv.isDevEnabled && <MenuItem hasBorder onPress={props.onDeveloperSettings}>
          Developer Settings
        </MenuItem>}
        <MenuItem
          menuControl={
            <MenuRightText>{ getVersion(props.walletEnv) }</MenuRightText>
          }
          onPress={props.onVersionPress}
        >
          Version
        </MenuItem>
      </Body>
    </Container>
  )
}