import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import { SkLogo } from 'design-system';
import { SkBackground } from '../../components';
import { View } from 'react-native';

import LogoFull from './splash/logo-full.svg';
import { useApp } from '../../core/modules/app/use-app';

const Title = styled(Text)`
  color: #0ABBD0;
  font-size: 18px;
  font-family: Lato-Regular;
  margin-top: 20;
`;

const Container = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  top: 19%;
`;

export function LoadingScreen() {
  const {loadAndRedirect} = useApp();

  useEffect(() => {
    setTimeout(loadAndRedirect, 1000);
  }, []);

  return (
    <div style={{ backgroundColor: '#111111', height: '100vh', display: 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
      <LogoFull />
      {/* <Container> */}
      {/* <SkLogo />
        <Title>IDENTITY WALLET</Title> */}
      {/* </Container> */}
    </div>

  );
}
