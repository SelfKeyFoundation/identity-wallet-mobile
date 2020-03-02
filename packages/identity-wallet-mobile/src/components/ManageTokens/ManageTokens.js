
// @flow
import React, { useCallback, useMemo, useState } from 'react';
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
import { TokensEmptyAlert } from '../index';
import { View, Text, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import styled from 'styled-components/native';
const screenWidth = Dimensions.get('window').width

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
  flex: 1;
`;

const TokenRow = styled.View`
  flex-direction: row;
  background: #2E3945;
  padding: 15px;
  margin-top: 15px;
  border-radius: 4px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
`;

const TokenOptionsRow = styled.View`
  flex-direction: row;
  padding: 15px;
  margin-top: 15px;
  justify-content: flex-end;
`;

const HideLink = styled(Link)`
  font-size: 13px;
  text-transform: uppercase;
`

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
  line-height: 19px;
  text-align: center;
  width: 100%;
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
      { props.name && props.name.substring(0, 1) }
    </TokenIconTitle>
  </TokenIconContainer>
);

const HeaderTitle = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  text-align: center;
  margin-top: 15px;
`;

const EmptyAlertConatiner = styled.View`
  margin-top: 10px;
`;

const TestView = styled.View`
  height: 100px;
  width: 100%;
  background: red;
  margin-bottom: 20px;
`;

const ScrollWrapper = styled.View`
  margin-bottom: 400px;
`;

const removeOffset = -screenWidth;

export interface Token {
  id: string;
  name: string;
  code: string;
  amount: number;
  fiatAmount: number;
  fiatCurrency: string;
}

export interface ManageTokensProps {
  tokens: Token;
  tokensFiatAmount: number;
  tokensFiatCurrency: string;
}

export function ManageTokens(props: ManageTokensProps) {
  const { tokenToRemove, tokens, tokensFiatAmount, tokensFiatCurrency, onRemove  } = props;
  const [openedRow, setOpenedRow] = useState();
  const listData = useMemo(() => tokens.map(token => ({
    ...token,
    key: token.id
  })).filter(item => !(tokenToRemove && item.id === tokenToRemove.id)), [tokens, tokenToRemove]);

  const handleRowOpen = rowKey => {
    setOpenedRow(rowKey)
  };

  const handleRowClose = () => {
    setOpenedRow(null);
  };

  const handleTokenDetails = token => () => {
    if (openedRow) {
      return null;
    }

    props.onTokenDetails(token.symbol)
  };

  return (
    <Container>
      { props.children }
      <TitleRow>
        <Col>
          <Title>My Tokens</Title>
          <TotalTokenAmount>
            <FormattedNumber
              value={tokensFiatAmount || 0}
              currency={tokensFiatCurrency}
            />
          </TotalTokenAmount>
        </Col>
        <Col autoWidth marginTop={15}>
          <ButtonLink iconName="icon-add" onPress={props.onAdd}>
            Add Token
          </ButtonLink>
        </Col>
      </TitleRow>
      {
        tokens.length ? null : (
          <EmptyAlertConatiner>
            <TokensEmptyAlert>
              Hit the "Add Token" button above to add any ERC-20 tokens.
            </TokensEmptyAlert>
          </EmptyAlertConatiner>
        )
      }
      <Row>
        <Col marginBottom={40}>
          <SwipeListView
            data={listData}
            previewRowKey="0"
            renderItem={ ({ item: token }, rowMap) => (
              <TouchableWithoutFeedback onPress={handleTokenDetails(token)}>
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
                        decimal={10}
                      />
                    </TokenName>
                    <Explanatory>
                      <FormattedNumber
                        value={token.balanceInFiat}
                        currency={token.fiatCurrency}
                        decimal={2}
                      />
                    </Explanatory>
                  </Col>
                </TokenRow>
              </TouchableWithoutFeedback>
            )}
            renderHiddenItem={ (data, rowMap) => (
              <TokenOptionsRow key={data.item.id}>
                <TouchableWithoutFeedback onPress={() => props.onRemove(data.item)}>
                  <Col autoWidth noPadding>
                    <Row justifyContent="center">
                      <Col autoWidth noPadding>
                        <SKIcon name="icon-hide" color="#00C0D9" size={16} />
                      </Col>
                    </Row>
                    <Row justifyContent="center" marginTop={10}>
                      <Col autoWidth noPadding>
                        <HideLink>Hide</HideLink>
                      </Col>
                    </Row>
                  </Col>
                </TouchableWithoutFeedback>
              </TokenOptionsRow>
            )}
            onRowOpen={handleRowOpen}
            onRowClose={handleRowClose}
            leftOpenValue={0}
            rightOpenValue={-70}
          />
        </Col>
      </Row>
    </Container>
  );
}
