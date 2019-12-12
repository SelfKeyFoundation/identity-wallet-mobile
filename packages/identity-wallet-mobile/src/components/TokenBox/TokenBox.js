
// @flow
import React from 'react';
import {
  ScreenContainer,
  SKIcon,
  Grid,
  Col,
  Row,
  ThemeContext,
  Paragraph,
  Explanatory,
  FormattedNumber,
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

export interface TokenBoxProps {
  iconComponent: any;
  onTransfer: () => void;
  tokenName: string;
  tokenCode: string;
  tokenAmount: number;
  fiatCurrency: string;
  fiatAmount: number;
}

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.regular};
  margin-top: 10px;
`;

const Container = styled.View`
  background: #2E3945;
  padding: 21px;
  border-radius: 4px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
`;

const TokenAmount = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 40px;
  font-family: ${props => props.theme.fonts.regular};
`;

const TokenSymbol = styled(Explanatory)`
  margin-bottom: 5px;
  margin-left: 5px;
  text-transform: uppercase;
`;

export function TokenBox(props: TokenBoxProps) {
  const TokenIcon = props.iconComponent;

  return (
    <Container>
      <Row marginBottom={10}>
        <Col autoWidth>
          <TokenIcon width={44} height={44}/>
        </Col>
        <Col>
          <Title>{props.tokenName}</Title>
        </Col>
        <Col autoWidth>
          <SKIcon
            name="icon-swap"
            size={26}
            color="#93B0C1"
            onPress={props.onTransfer}
          />
        </Col>
      </Row>
      <Row alignBottom marginBottom={10}>
        <TokenAmount>
          <FormattedNumber value={props.tokenAmount} decimal={3}/>
        </TokenAmount>
        <TokenSymbol>{props.tokenCode}</TokenSymbol>
      </Row>
      <Row autoWidth alignBottom>
        <Explanatory>
          <FormattedNumber
            value={props.fiatAmount}
            currency={props.fiatCurrency}
          />
        </Explanatory>
      </Row>
    </Container>
  );
}
