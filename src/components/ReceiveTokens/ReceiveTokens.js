import React from 'react';
import {
  ScreenContainer,
  Modal,
  Button,
  SKIcon,
  Grid,
  Col,
  Row,
  ThemeContext,
  Paragraph,
  Explanatory,
  DefinitionTitle,
  FormattedNumber,
} from 'design-system';
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';
import styled from 'styled-components/native';

export interface ReceiveTokensProps {
  tokenSymbol: string;
  tokenAddress: string;
}

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.regular};
  margin-top: 10px;
`;

const Label = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
`;

const Container = styled.View`
  background: #2E3945;
  border-radius: 4px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
`;

const Header = styled.View`
  padding: 21px;
`;

const TokenAmount = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 40px;
  font-family: ${props => props.theme.fonts.regular};
`;

const BodyText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.bold};
  text-align: right;
`;

const TokenSymbol = styled(Explanatory)`
  margin-bottom: 5px;
  margin-left: 5px;
  text-transform: uppercaseC;
`;

const ButtonText = styled.Text`
  align-items: center;
`;

const Body = styled.View`
  border-color: #475768;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  margin-bottom: 19px;
  padding: 31px 15px;
  align-items: center;
`;

const Footer = styled.View`
  padding: 0 8px 40px 8px;
  flex-direction: row;
`;

const FooterCol = styled.View`
  flex: 1;
  padding: 0 8px;
`;

const TokenGrid = styled(Grid)`
  margin: 0 15px 15px 15px;
`;

const YourAddress = styled(DefinitionTitle)``;

const QRCodeContainer = styled.View`
  padding: 10px;
  background: white;
  width: 220px;
`;

const AddressText  = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const ReceiveTokens = props => (
  <Modal
    { ...props }
    title={`Receive ${props.tokenSymbol}`}
    footer={null}
    noBodyPadding
  >
    <Body>
      <QRCodeContainer>
        <QRCode
          value={props.tokenAddress}
          size={200}
        />
      </QRCodeContainer>
      {props.children}
    </Body>
    <TokenGrid>
      <Row>
        <Col>
          <YourAddress>Your Address to receive {props.tokenSymbol}</YourAddress>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddressText>{props.tokenAddress}</AddressText>
        </Col>
      </Row>
    </TokenGrid>
    <Footer>
      <FooterCol>
        <Button
          type="shell-primary"
          onPress={props.onCopy}
          icon={<SKIcon name="icon-copy" size={24} color="#00C0D9" />}
          buttonStyle={{
            height: 50,
          }}
          contentStyle={{
            height: 47,
          }}
        >
            Copy
        </Button>
      </FooterCol>
      <FooterCol>
        <Button
          type="shell-primary"
          onPress={props.onShare}
          icon={<SKIcon name="icon-share" size={24} color="#00C0D9" />}
          buttonStyle={{
            height: 50,
          }}
          contentStyle={{
            height: 47,
          }}
        >
          Share
        </Button>
      </FooterCol>
    </Footer>
  </Modal>
);

