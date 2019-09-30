import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkBackground, SkLogo, Paragraph } from '@selfkey/mobile-ui/lib';
import styled from 'styled-components/native';

const Title = styled.Text`
  color: #0ABBD0;
  font-size: 18px;
  font-family: Lato-Regular;
  margin-top: 20;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  top: 19%;
`;

export default function LoadingScreen() {
  return (
    <SkBackground>
      <Container>
        <SkLogo />
        <Title>IDENTITY WALLET</Title>
      </Container>
    </SkBackground>
  );
}
