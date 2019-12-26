import React from 'react';
import { TokenDetails } from '../../components';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { SKIcon } from '@selfkey/mobile-ui';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const Header = styled.View`
  margin: 10px 20px 25px 20px;
`;

const Body = styled.ScrollView`
  margin: 0 20px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 24px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;

const IconContainer = styled.TouchableWithoutFeedback`
  position: absolute;
  top: 5px;
  left: -10px;
  padding: 10px;
`;

export function TokenDetailsScreen(props) {

  return (
    <Container>
      <Header>
        <Title>{props.title}</Title>
        <IconContainer onPress={props.onBack}>
          <SKIcon name="icon-nav-ar-left" size={12} color="#fff" />
        </IconContainer>
      </Header>
      <Body>
        { props.children }
      </Body>
    </Container>
  )
}