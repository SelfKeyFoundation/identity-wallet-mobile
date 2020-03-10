
// @flow
import React from 'react';
import {
  ScreenContainer,
  SKIcon,
  Grid,
  Col,
  Row,
  Link,
  ButtonLink,
  ThemeContext,
  Paragraph,
  Explanatory,
  FormattedNumber
} from '@selfkey/mobile-ui';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { IconKey, IconEth } from '@selfkey/mobile-ui/lib/svg-icons';

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  font-family: ${props => props.theme.fonts.regular};
  margin-bottom: 4px;
`;

const TotalTokenAmount = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
`;

const Container = styled.View`

`;

const TokenRow = styled.View`
  flex-direction: row;
  background: #2E3945;
  padding: 15px;
  margin-top: 15px;
  border-radius: 4px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
`;

const TokenName = styled.Text`
  color: ${({ theme }) => theme.colors.white };
  font-size: 18px;
  font-family: ${props => props.theme.fonts.regular};
  margin-bottom: 3px;
  line-height: 22px;
`;

const TokenIconContainer = styled.View`
  background-color: ${(props) => props.color || '#2DA1F8' };
  padding: 11px 0 14px 0;
  width: 44px;
  border-radius: 5px;
`;

const TokenIconTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white };
  font-size: 16px;
  text-align: center;
  width: 100%;
  line-height: 19px;
  font-family: ${props => props.theme.fonts.regular};
  text-transform: uppercase;
`;

const TitleRow = styled.View`
  margin: 14px;
  flex-direction: row;
`;

const TokenIcon = props => (
  <TokenIconContainer color={props.color}>
    <TokenIconTitle>
      { props.name && props.name.substring(0, 1)}
    </TokenIconTitle>
  </TokenIconContainer>
);

export interface Token {
  id: string;
  name: string;
  code: string;
  amount: number;
  fiatAmount: number;
  fiatCurrency: string;
}

export interface MyTokensProps {
  tokens: Token;
  tokensFiatAmount: number;
  tokensFiatCurrency: string;
}

export function MyTokens(props: MyTokensProps) {
  return (
    <Container>
      <TitleRow>
        <Col>
          <Title>My Tokens</Title>
          <TotalTokenAmount>
            <FormattedNumber
              value={props.tokensFiatAmount || 0}
              currency={props.tokensFiatCurrency}
            />
          </TotalTokenAmount>
        </Col>
        <Col autoWidth marginTop={15}>
          <ButtonLink iconName="icon-menu-settings" onPress={props.onManage}>
            Manage
          </ButtonLink>
        </Col>
      </TitleRow>
      {
        props.tokens.map(token => (
          <TouchableWithoutFeedback onPress={() => props.onTokenDetails(token.symbol)}>
            <TokenRow key={token.id}>
              <Col autoWidth noPadding>
                <TokenIcon name={token.name || token.symbol} color={token.color} />
              </Col>
              <Col noPadding paddingLeft={11}>
                <TokenName>
                  { token.name || token.symbol }
                </TokenName>
                <Explanatory>
                  { token.symbol && token.symbol.toUpperCase() }
                </Explanatory>
              </Col>
              <Col autoWidth alignItems="flex-end" noPadding>
                <TokenName>
                  <FormattedNumber
                    value={token.balance}
                    decimal={token.decimal}
                  />
                </TokenName>
                <Explanatory>
                  <FormattedNumber
                    value={token.fiatAmount}
                    currency={token.fiatCurrency}
                  />
                </Explanatory>
              </Col>
            </TokenRow>
          </TouchableWithoutFeedback>
        ))
      }
      { props.showViewAll &&
        <Row justifyContent="center" marginTop={25}>
          <Col autoWidth>
            <ButtonLink iconName="icon-expand_arrow-1" onPress={props.onViewAll} iconSize={11.13}>
              View All Tokens
            </ButtonLink>
          </Col>
        </Row>
      }
    </Container>
  );
}
