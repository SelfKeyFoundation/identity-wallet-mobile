import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components/native';

const ContainerCentered = styled.View`
  background-color: ${props => props.theme.colors.baseDark};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContainerRegular = styled.View`
  background-color: ${props => props.theme.colors.baseDark};
`;

export const Container = ({ children, centered }) => {
  if (centered) {
    return (
      <ContainerCentered>
        { children }
      </ContainerCentered>
    );
  }

  return (
    <ContainerRegular>
      { children }
    </ContainerRegular>
  );
};




