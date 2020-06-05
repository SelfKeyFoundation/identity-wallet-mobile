import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, RefreshControl, View, TouchableWithoutFeedback } from 'react-native';
import { DocumentsEmptyAlert } from '../../components';
import {
  ScreenContainer,
  Grid,
  Row,
  Col,
  DefinitionDescription,
  FormText,
  Explanatory,
  TableText,
  SKIcon,
  IconAddImage
} from '@selfkey/mobile-ui';
import { WalletTracker } from '../../WalletTracker';
import { FIRST_NAME_ATTRIBUTE, EMAIL_ATTRIBUTE, LAST_NAME_ATTRIBUTE } from '@selfkey/wallet-core/modules/identity/constants';

const TRACKER_PAGE = 'dashboard';


const HeaderTitle = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  text-align: center;
  margin-top: 15px;
  margin-bottom: 25px;
`;

const Container = styled.ScrollView`
  flex: 1;
  background-color:  ${props => props.theme.colors.baseDark};
`;

const RoundedImage = styled.Image`
  width: 85px;
  height: 85px;
  border-radius: 75px;
  overflow: hidden;
  border: 2px solid #313D49;
  margin: 10px auto;
`;

const RoundedContainer = styled.View`
  width: 85px;
  height: 85px;
  border-radius: 75px;
  overflow: hidden;
  border: 2px solid #313D49;
  margin: 10px auto;
  background: #313D49;
  align-items: center;
  justify-content: center;
`;

const ProfileName = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  font-family: ${props => props.theme.fonts.bold};
  text-align: center;
  line-height: 30px;
`;

const ProfileEmail = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
  text-align: center;
  line-height: 24px;
`;

const TabMenu = styled(Grid)`
  margin-top: 20px;
`;

const TabCol = styled(Col)`
  border: 0px solid #00C0D9;
  border-bottom-width: 4px;
  padding-right: 15px;
  padding-left: 20px;
`;

const TabTitle = styled(FormText)`
  color: ${props => props.theme.colors.white};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.bold};
  text-align: center;
  padding-bottom: 5px;
`;

const TabPlaceholder = styled(Col)`
  border: 0px solid #697C95;
  border-bottom-width: 1px;
`;

const SectionHeader = styled(Grid)`
  margin: 15px 20px 0 20px;
`;

const SectionTitle = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 30px;
`;

const SectionDescription = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 24px;
`;

const AttrValue = styled(TableText)`
  font-family: ${props => props.theme.fonts.bold};
`;

const AttrRow = styled(Row)`
  padding: 10px 20px;
  border: 0 solid #475768;
  border-bottom-width: 1px;
`;

const AttrLabel = styled(Explanatory)`
  line-height: 19px;
`;

const EmptyItemsConatiner = styled.View`
  margin: 20px;
`;

const OptionsWrapper = styled.View`
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  right: 20px;
  width: 300px;
  height: 200px;
`;

const OptionsMenuWrapper = styled.View`
  padding: 20px;
  background: #313D49;
  border-radius: 20px;
`;

const OverflowContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(30,38,46,0.53);
  z-index: 1;
`;

const IconWrapper = styled.View`
  padding: 10px;
`;

const OptionText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  line-height: 24px;
  font-family: ${props => props.theme.fonts.regular};
`;

const Backdrop = props => {
  return  (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <OverflowContainer />
    </TouchableWithoutFeedback>
  )
}

const OptionsMenuAnchor = (props) => {
  const { id } = props;
  const viewRef = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePress = () => {
    viewRef.current.measure((fx, fy, width, height, px, py) => {
      props.onPress({
        id,
        x: px,
        y: py
      });
    });
  };

  return (
    <View ref={viewRef} renderToHardwareTextureAndroid={true}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <IconWrapper>
          <SKIcon
            name="icon-expand-menu"
            size={16}
            color="#93B0C1"
          />
        </IconWrapper>
      </TouchableWithoutFeedback>
    </View>
  )
}

const OptionsView = (props) => {
  return (
    <OptionsWrapper style={{ top: props.y }}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <IconWrapper>
          <SKIcon
            name="icon-expand-menu"
            size={16}
            color="#FFF"
          />
        </IconWrapper>
      </TouchableWithoutFeedback>
      <OptionsMenuWrapper >
        <Grid>
          <TouchableWithoutFeedback onPress={props.onEdit}>
            <Row alignItems="center">
              <Col autoWidth>
                  <SKIcon name="icon-edit" color="#FFF" size={16} />
              </Col>
              <Col>
                <OptionText>Edit</OptionText>
              </Col>
            </Row>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={props.onDelete}>
            <Row alignItems="center">
              <Col autoWidth>
                <SKIcon name="icon-delete" color="#FFF" size={16} />
              </Col>
              <Col>
                <OptionText>Delete</OptionText>
              </Col>
            </Row>
          </TouchableWithoutFeedback>
        </Grid>
      </OptionsMenuWrapper>
    </OptionsWrapper>
  )
}

// const defaultImageUri = 'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png';

function getAttributeValue(attributes, attributeUrl) {
  const attr = attributes.find(item => item.type.url === attributeUrl);
  return attr && attr.data.value;
}

export function MyProfile(props) {
  const { profile } = props;
  const { allAttributes = [], basicAttributes = [], identity = {} } = profile;
  const [currentOptionsMenu, setCurrentOptionsMenu] = useState();
  const [scrollY, setScrollY] = useState(0);

  const handleOptions = ({ id, x, y }) => {
    setCurrentOptionsMenu({
      id,
      x,
      y: y + scrollY
    });
  }

  const handleCloseMenu = () => {
    setCurrentOptionsMenu(null);
  }

  const handleEdit = () => {
    const { id } = currentOptionsMenu;
    const attribute = profile.allAttributes.find(attr => attr.id === id);
    props.onAttributeEdit(attribute);
    handleCloseMenu();
  }

  const handleDelete = () => {
    const { id } = currentOptionsMenu;
    handleCloseMenu();
  }

  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y)
  }

  return (
    <Container onScroll={handleScroll} scrollEventThrottle={160}>
      <SafeAreaView style={{ position: 'relative' }}>
        <HeaderTitle>SelfKey Profile</HeaderTitle>
        <TouchableWithoutFeedback onPress={props.onPictureEdit}>
          {
            identity.profilePicture ? (
              <RoundedImage
                source={{
                  uri: identity.profilePicture
                }}
              />
            ) : (
              <RoundedContainer>
                <IconAddImage width={40} height={40} />
              </RoundedContainer>
            )
          }
        </TouchableWithoutFeedback>
        <ProfileName>{getAttributeValue(basicAttributes, FIRST_NAME_ATTRIBUTE)} {getAttributeValue(basicAttributes, LAST_NAME_ATTRIBUTE)}</ProfileName>
        <ProfileEmail>{getAttributeValue(basicAttributes, EMAIL_ATTRIBUTE)}</ProfileEmail>
        <TabMenu>
          <Row alignItems="flex-end">
            <TabCol active autoWidth>
              <TabTitle>Overview</TabTitle>
            </TabCol>
            <TabPlaceholder />
          </Row>
        </TabMenu>
        <SectionHeader>
          <Row>
            <Col>
              <SectionTitle>Informations</SectionTitle>
              <SectionDescription>4 entries</SectionDescription>
            </Col>
          </Row>
        </SectionHeader>
        <Grid>
          {
            profile.basicAttributes.map((attribute) => {
              return (
                <AttrRow>
                  <Col>
                    <AttrLabel>{attribute.type.content.title}</AttrLabel>
                    <AttrValue>{attribute.data.value}</AttrValue>
                  </Col>
                  <Col autoWidth>
                    <OptionsMenuAnchor
                      id={attribute.id}
                      onPress={handleOptions}
                    />
                  </Col>
                </AttrRow>
              )
            })
          }
        </Grid>
        <SectionHeader>
          <Row>
            <Col>
              <SectionTitle>Documents</SectionTitle>
              <SectionDescription>0 documents</SectionDescription>
            </Col>
          </Row>
        </SectionHeader>
        <EmptyItemsConatiner>
          <DocumentsEmptyAlert>
            Hit the “Add new” button above to add documents relevant to your identity, needed for marketplace KYC processes.
          </DocumentsEmptyAlert>
        </EmptyItemsConatiner>
        { currentOptionsMenu ? <Backdrop onPress={handleCloseMenu} /> : null }
        { currentOptionsMenu ? (
          <OptionsView
            y={currentOptionsMenu.y}
            onPress={handleCloseMenu}
            onDelete={handleDelete}
            onEdit={handleEdit}
          /> ) : null
        }
      </SafeAreaView>
    </Container>
  );
}