import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { TokenBoxCarouselContainer, MyTokensContainer, TxHistoryContainer } from '../../components';
import {
  ScreenContainer,
  Grid,
  Row,
  Col,
} from '@selfkey/mobile-ui';
import { WalletTracker } from '../../WalletTracker';

const TRACKER_PAGE = 'dashboard';


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
  margin: 40px 20px 10px 20px;
`;

const TxHistoryRow = styled.View`
  margin: 20px 20px 50px 20px;
`;

export function Dashboard(props) {

  const handleRefresh = () => {
    WalletTracker.trackEvent({
      category: `${TRACKER_PAGE}/refreshButton`,
      action: 'press',
      level: 'machine'
    });

    props.onRefresh(); 
  }

  return (
    <Container>
      <SafeAreaView>
        <HeaderTitle>Dashboard</HeaderTitle>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={props.refreshing} onRefresh={handleRefresh} />
          }
        >
          <CarouselRow>
          <TokenBoxCarouselContainer />
          </CarouselRow>  
          <MyTokensRow>
            <MyTokensContainer />
          </MyTokensRow>
          <TxHistoryRow>
            <TxHistoryContainer />
          </TxHistoryRow>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}