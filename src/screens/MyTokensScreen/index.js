import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { ManageTokensContainer } from '../../components';

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

const Body = styled.View`
  flex: 1;
  margin: 10px 20px 60px 20px;
`;

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export default function MyTokensScreen() {
  return (
    <Container>
      <Wrapper>
        <HeaderTitle>Manage Tokens</HeaderTitle>
        <Body>
          <ManageTokensContainer />
        </Body>
      </Wrapper>
    </Container>
  );
}