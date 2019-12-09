import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView } from 'react-native';
import { TokenBoxCarouselHOC, MyTokensHOC } from '../../components';
import {
  ScreenContainer,
  Grid,
  Row,
  Col,
} from '@selfkey/mobile-ui';

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

const CarouselRow = styled.View`
  margin-top: 25px;
`;

const MyTokensRow = styled.View`
  margin: 40px 20px 26px 20px;
`;

export function Dashboard(props) {
  return (
    <Container>
      <SafeAreaView>
        <HeaderTitle>Dashboard</HeaderTitle>
        <ScrollView>
          <CarouselRow>
          <TokenBoxCarouselHOC />
          </CarouselRow>  
          <MyTokensRow>
            <MyTokensHOC />
          </MyTokensRow>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}