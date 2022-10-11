import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import { SkLogo } from 'design-system';
import { SkBackground } from '../../components';

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

export function LoadingScreen() {
  useLayoutEffect(() => {
    // Close the SplashScreen
    // The LoadingScreen can take some ms to be rendered
    // This timeout will prevent a quick white screen between splash screen and loading screen
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <SkBackground>
      <Container>
        {/* <SkLogo />
        <Title>IDENTITY WALLET</Title> */}
      </Container>
    </SkBackground>
  );
}
