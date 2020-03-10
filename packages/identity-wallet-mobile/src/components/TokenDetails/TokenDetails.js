
// @flow
import React, { useCallback } from 'react';
import {
  ScreenContainer,
  Button,
  SKIcon,
  Grid,
  Col,
  Row,
  ThemeContext,
  Paragraph,
  Explanatory,
  FormattedNumber,
} from '@selfkey/mobile-ui';

import { Text } from 'react-native';
import styled from 'styled-components/native';

export interface TokenDetailsProps {
  iconComponent: any;
  tokenName: string;
  tokenAmount: number;
  tokenCode: string;
  fiatAmount: number;
  fiatCurrency: string;
  lastPrice: number;
  lastPriceCurrency: string;
  tokenContract: string;
  onReceive: () => void;
  onSend: () => void;
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
  text-transform: uppercase;
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
`;

const Footer = styled.View`
  padding: 0 8px 40px 8px;
  flex-direction: row;
`;

const FooterCol = styled.View`
  flex: 1;
  padding: 0 8px;
`;

function formatAddress(address) {
  if (!address) {
		return ''
  }

  const firstPart = address.substring(0, 12);
  const lastPart = address.substring(address.length - 6, address.length);

  return `${firstPart}...${lastPart}`.toLowerCase();
}

export function TokenDetails(props: TokenDetailsProps) {
  const TokenIcon = props.iconComponent;
  const handleReceive= useCallback(() => {
    if (props.onReceive) {
      props.onReceive(props.tokenCode === 'custom-tokens' ? 'Custom Tokens': props.tokenCode);
    }
  });

  return (
    <Container>
      <Header>
        <Row marginBottom={10}>
          <Col autoWidth>
            { TokenIcon && <TokenIcon width={44} height={44}/> }
          </Col>
          <Col>
            <Title>{props.tokenName}</Title>
          </Col>
        </Row>
        { props.tokenAmount !== undefined && <Row alignBottom marginBottom={10}>
          <TokenAmount>
            <FormattedNumber value={props.tokenAmount} decimal={10}/>
          </TokenAmount>
          <TokenSymbol>{props.tokenCode}</TokenSymbol>
        </Row>}
        { props.tokenAmount !== undefined && <Row autoWidth alignBottom>
          <Explanatory>
            <FormattedNumber
              value={props.fiatAmount}
              currency={props.fiatCurrency}
            />
          </Explanatory>
        </Row>}
      </Header>
      { props.tokenCode === 'custom-tokens' ? null : <Body>
        { props.lastPrice ? <Row marginBottom={12}>
          <Col>
            <Label>Last Price</Label>
          </Col>
          <Col autoWidth>
            <BodyText>
              <FormattedNumber
                value={props.lastPrice}
                decimal={props.fiatDecimal || 2}
                currency={props.lastPriceCurrency}
              />
            </BodyText>
          </Col>
        </Row> : null}
        { props.contractAddress ? <Row>
          <Col>
            <Label>Token Contract</Label>
          </Col>
          <Col autoWidth>
            <BodyText>
              { formatAddress(props.contractAddress) }
            </BodyText>
          </Col>
        </Row> : null}
      </Body>}
      <Footer>
        <FooterCol>
          <Button
            type="shell-primary"
            onPress={handleReceive}
            icon={<SKIcon name="icon-qr" size={24} color="#00C0D9" />}
            buttonStyle={{
              height: 50,
            }}
            contentStyle={{
              height: 47,
            }}
          >
              Receive
          </Button>
        </FooterCol>
        <FooterCol>
          <Button
            type="shell-primary"
            onPress={props.onSend}
            icon={<SKIcon name="icon-send" size={24} color="#00C0D9" />}
            buttonStyle={{
              height: 50,
            }}
            contentStyle={{
              height: 47,
            }}
          >
            Send
          </Button>
        </FooterCol>
      </Footer>
    </Container>
  );
}
