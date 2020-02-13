import React from 'react';
import { TokenDetails } from '../../components';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { SKIcon } from '@selfkey/mobile-ui';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const Header = styled.View`
  margin: 10px 20px 40px 20px;
`;

const Body = styled.ScrollView`
  margin: 0 20px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 24px;
  width: 100%;
  text-align: center;
  position: absolute;
`;

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

const IconContainer = styled.View`
  position: absolute;
  top: -2px;
  left: -8px;
`;

export function CustomTokensScreen(props) {

  return (
    <Container>
      <Header>
        <Title>{props.title}</Title>
          <IconContainer>
            <TouchableWithoutFeedback onPress={props.onBack}>
              <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
            </TouchableWithoutFeedback>
          </IconContainer>
      </Header>
      <Body>
        { props.children }
      </Body>
    </Container>
  )
}