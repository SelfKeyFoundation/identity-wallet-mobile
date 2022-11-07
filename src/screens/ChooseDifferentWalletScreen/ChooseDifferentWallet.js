import React, { useContext } from 'react';
import { TokenDetails } from '../../components';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import {
  SKIcon,
  Row,
  Col,
  H3,
  Paragraph,
  ThemeContext,
} from 'design-system';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const Header = styled.View`
  margin: 10px 20px 40px 20px;
`;

const Body = styled.ScrollView`
  margin: 0 35px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 24px;
  text-transform: uppercase;
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

const IconCol = styled(Col)`
  align-items: center;
`;

const TitleCol = styled(Col)`
  justify-content: center;
`;

const PageTitle = styled(H3)`
  text-align: center;
`;

const PageDescription = styled(Paragraph)`
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`;

const MenuOption = styled.View`
  border: 2px solid #1CA9BA;
  border-radius: 40px;
  flex: 1;
  padding: 14px 25px;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`

const MenuOptionText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 17px;
  text-transform: uppercase;
`

export function ChooseDifferentWallet(props) {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Header>
        <IconContainer>
          <TouchableWithoutFeedback onPress={props.onBack}>
            <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
          </TouchableWithoutFeedback>
        </IconContainer>
      </Header>
      <Body>
        <Row>
          <IconCol>
            <SKIcon name="icon-wallet" color={theme.colors.primary} size={66} />
          </IconCol>
        </Row>
        <Row>
          <TitleCol>
            <PageTitle align="center">
              Choose a Different Wallet
            </PageTitle>
          </TitleCol>
        </Row>
        <Row marginBottom={10}>
          <TitleCol>
            <PageDescription>
              If you have more than one SelfKey wallet, you can choose here which one you want to currently use.
            </PageDescription>
          </TitleCol>
        </Row>
        <TouchableWithoutFeedback onPress={props.onExistingAddress}>
          <MenuOption>
            <Col autoWidth noPadding>
              <SKIcon name="icon-existing-address" color={theme.colors.primary} size={24}/>
            </Col>
            <Col noPadding marginLeft={20}>
              <MenuOptionText>
                Existing Address On Device
              </MenuOptionText>
            </Col>
          </MenuOption>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={props.onNewAddress}>
          <MenuOption>
            <Col autoWidth noPadding>
              <SKIcon name="icon-import-address" color={theme.colors.primary} size={24}/>
            </Col>
            <Col noPadding marginLeft={20}>
              <MenuOptionText>
                Create a New Address
              </MenuOptionText>
            </Col>
          </MenuOption>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback onPress={props.onImportFromDesktop}>
          <MenuOption>
            <Col autoWidth noPadding>
              <SKIcon name="icon-import-address" color={theme.colors.primary} size={24}/>
            </Col>
            <Col noPadding marginLeft={20}>
              <MenuOptionText>
                Import From Desktop
              </MenuOptionText>
            </Col>
          </MenuOption>
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback onPress={props.onImportFromSeedPhrase}>
          <MenuOption>
            <Col autoWidth noPadding>
              <SKIcon name="icon-import-address" color={theme.colors.primary} size={24}/>
            </Col>
            <Col noPadding marginLeft={20}>
              <MenuOptionText>
                Import From Seed Phrase
              </MenuOptionText>
            </Col>
          </MenuOption>
        </TouchableWithoutFeedback>
      </Body>
    </Container>
  )
}