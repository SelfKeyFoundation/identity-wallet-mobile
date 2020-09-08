import React from 'react';
import styled from 'styled-components/native';
import { SkLogo } from 'design-system';
import { SkBackground } from '../../components';

const Title = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.regular};
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  top: 19%;
`;

const Row = styled.View`
  flex-grow: 1;
`;

export function SetupCompleteScreen() {
  return (
    <SkBackground>
      <Container>
        <Row>
          <SkLogo />
        </Row>
        <Row>
          <Title>SETUP COMPLETE</Title>
        </Row>
      </Container>
    </SkBackground>
  );
}
