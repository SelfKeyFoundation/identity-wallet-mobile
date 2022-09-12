
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
} from 'design-system';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { IconKey, IconEth } from 'design-system/svg-icons';
import LinearGradient from 'react-native-linear-gradient';

import { WalletTracker } from '../../WalletTracker';
import { TokenIconMapping } from 'components/token-icon-mapping';

const TRACKER_PAGE = 'dashboard/myTokens';

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  font-family: ${props => props.theme.fonts.regular};
  margin-bottom: 4px;
  margin-top: 0;
`;

const TotalTokenAmount = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
`;

const Container = styled.View``;

const TokenRowWrapper = styled.View`
  
`;

const TokenRow = styled(LinearGradient)`
  flex-direction: row;
  padding: 15px;
  margin-top: 15px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
  border-radius: 16px;
  border-color: #273340;
  border-width: 1px;
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
  margin: 0 14px 2px 14px;
  flex-direction: row;
`;

const TokenIcon = props => {
  const IconComponent = TokenIconMapping[props.iconName];
  if (IconComponent) {
    
    return <IconComponent width={44} height={44}/>
  };

  return (
    <TokenIconContainer color={props.color}>
      <TokenIconTitle>
        { props.name && props.name.substring(0, 1)}
      </TokenIconTitle>
    </TokenIconContainer>
  );
}

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
  const handleManage = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/manageButton`,
      action: 'press',
      level: 'machine'
    });

    props.onManage();
  }

  const handleTokenDetails = (token) => () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/tokenDetailsRow/${token.symbol}`,
      action: 'press',
      level: 'machine'
    });

    props.onTokenDetails(token.symbol);
  }

  const handleViewAll = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/viewAllButton`,
      action: 'press',
      level: 'machine'
    });

    props.onViewAll();
  }

  return (
    <Container>
      <TitleRow>
        <Col paddingTop={0}>
          <Title>My Tokens</Title>
          <TotalTokenAmount>
            <FormattedNumber
              value={props.tokensFiatAmount || 0}
              currency={props.tokensFiatCurrency}
            />
          </TotalTokenAmount>
        </Col>
        <Col autoWidth marginTop={15}>
          <ButtonLink iconName="icon-menu-settings" onPress={handleManage}>
            Manage
          </ButtonLink>
        </Col>
      </TitleRow>
      {
        props.tokens.map(token => (
          <TouchableWithoutFeedback onPress={handleTokenDetails(token)}>
            <TokenRowWrapper>
              <TokenRow key={token.id} colors={['#161A1F', '#1A2836']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.5 }}>
                <Col autoWidth noPadding>
                  <TokenIcon name={token.name || token.symbol} color={token.color} iconName={token.iconName}/>
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
                      digitLimit={9}
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
            </TokenRowWrapper>
          </TouchableWithoutFeedback>
        ))
      }
      { props.showViewAll &&
        <Row justifyContent="center" marginTop={25}>
          <Col autoWidth>
            <ButtonLink iconName="icon-expand_arrow-1" onPress={handleViewAll} iconSize={11.13}>
              View All Tokens
            </ButtonLink>
          </Col>
        </Row>
      }
    </Container>
  );
}
