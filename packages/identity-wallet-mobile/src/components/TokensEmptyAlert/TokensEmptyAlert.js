// @flow
import React from 'react';
import {
  SKIcon,
  Row,
  Col,
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

const Container = styled.View`
  background: #2E3945;
  border-radius: 4px;
  padding: 40px 30px 50px 30px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
  align-items: center;
  flex-direction: column;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white };
  font-size: 16px;
  font-family: ${props => props.theme.fonts.bold};
  margin-top: 10px;
  line-height: 24px;
  text-align: center;
`;

const Paragraph = styled.Text`
  color: ${({ theme }) => theme.colors.white };
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
  margin-top: 16px;
  line-height: 24px;
  text-align: center;
`;

export function TokensEmptyAlert(props) {
  return (
    <Container>
      <SKIcon name="icon-info-large" color="#09A8BA" size={66} />
      <Title>You don’t have any tokens yet.</Title>
      <Paragraph>
        { props.children }
      </Paragraph>
    </Container> 
  )
}
