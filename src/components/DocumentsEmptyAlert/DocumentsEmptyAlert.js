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

export function DocumentsEmptyAlert(props) {
  return (
    <Container>
      <InnerContainer colors={['#2E3945', '#222B34']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SKIcon name="icon-info-large" color="#09A8BA" size={66} />
        <Title>You don’t have any documents yet.</Title>
        <Paragraph>
          { props.children }
        </Paragraph>
      </InnerContainer>
    </Container> 
  )
}
