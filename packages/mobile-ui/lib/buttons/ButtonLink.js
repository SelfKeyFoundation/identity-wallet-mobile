import React from 'react';
import styled from 'styled-components/native';
import { Row, Col } from '../grid';
import { SKIcon } from '../icons';

const ButtonLinkWrapper = styled.TouchableWithoutFeedback`
  flex-direction: row;
`;

const ButtonLinkText = styled.Text`
  color: ${({ theme }) => theme.colors.primary };
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
  text-transform: uppercase;
`;

export const ButtonLink = (props) => {
  let iconItem;

  if (props.iconName) {
    iconItem = (
      <Col autoWidth>
        <SKIcon name={props.iconName} size={props.iconSize || 16} color="#00C0D9"/>
      </Col>
    );
  }

  return (
    <ButtonLinkWrapper onPress={props.onPress}>
      <Row alignItems="center">
        { iconItem }
        <Col>
          <ButtonLinkText>
            { props.children }
          </ButtonLinkText>
        </Col>
      </Row>
    </ButtonLinkWrapper>
  );
}