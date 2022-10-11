
// @flow
import React from 'react';
import {
  SKIcon,
  Row,
  Col,
} from 'design-system';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.View`
  background: #2E3945;
  border-radius: 4px;
  box-shadow: 2px 10px 24px rgba(0,0,0,0.3);
`;

const InnerContainer = styled(LinearGradient)`
  padding: 40px 30px 50px 30px;
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

export function TransactionsEmptyAlert(props) {
  return (
    <Container>
      <InnerContainer colors={['#161A1F', '#1A2836']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SKIcon name="icon-info-large" color="#09A8BA" size={66} />
        <Title>You don’t have any transactions yet.</Title>
        <Paragraph>Your transaction history will appear here, once you send or receive {props.tokenSymbol} tokens.</Paragraph>
      </InnerContainer>
    </Container> 
  )
}
