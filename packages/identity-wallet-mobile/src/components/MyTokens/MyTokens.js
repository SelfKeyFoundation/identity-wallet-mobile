
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
  SKIcon
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

export interface MyTokensProps {

}

export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.regular};
  margin-top: 10px;
`;

const Container = styled.View`
  background: #2E3945;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
`;

const LinkButtonWrapper = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;

const LinkButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary };
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
`;

const LinkButton = (props) => {
  let iconItem;

  if (props.iconName) {
    iconItem = (
      <Col autoWidth>
        <SKIcon name={props.iconName} size={13} />
      </Col>
    );
  }

  return (
    <LinkButtonWrapper onPress={props.onPress}>
      { iconItem }
      <Col>
        <LinkButtonText>
          { props.children }
        </LinkButtonText>
      </Col>
    </LinkButtonWrapper>
  )
}


export function MyTokens(props: MyTokensProps) {
  return (
    <Container>
      <Row marginBottom={10}>
        <Col>

        </Col>
        <Col>
          <LinkButton iconName="icon-menu-settings">
            Manage
          </LinkButton>
        </Col>
      </Row>
    </Container>
  );
}
