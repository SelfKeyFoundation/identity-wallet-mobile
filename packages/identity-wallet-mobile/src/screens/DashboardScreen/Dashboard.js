import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

const HeaderTitle = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  text-align: center;
  margin-top: 15px;
`;

const Container = styled.View`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

export function Dashboard(props) {
  return (
    <Container>
      <SafeAreaView>
        <HeaderTitle>Dashboard</HeaderTitle>
        {
          // Terms of service modal
          props.children
        }
      </SafeAreaView>
    </Container>
  );
}