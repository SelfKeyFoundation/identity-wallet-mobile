import React from 'react';
import { View, SafeAreaView } from 'react-native';

import styled from 'styled-components/native';

const ContainerCentered = styled.View`
  background-color: ${props => props.theme.colors.baseDark};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScreenContainer = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.baseDark};
  flex: 1;
`;

const ContainerRegular = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.baseDark};
  margin: ${(props) => props.withMargin ? '35px' : 0};
`;

export const Container = (props) => {
  if (props.centered) {
    return <ContainerCentered {...props} />;
  }

  return <ContainerRegular {...props} />;
};




