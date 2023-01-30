import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, TouchableWithoutFeedback, ScrollView, View, Text } from 'react-native';
import { Grid, Row, Col, FormText, IconAddImage } from 'design-system';
import {
	FIRST_NAME_ATTRIBUTE,
	EMAIL_ATTRIBUTE,
	LAST_NAME_ATTRIBUTE,
} from 'core/modules/identity/constants';

import { ProfileOverviewTab } from './tabs/ProfileOverviewTab';
import { ProfileDIDTab } from './tabs/ProfileDIDTab';
import { ProfileApplicationsTab } from './tabs/ProfileApplicationsTab';
import { Image } from 'native-base';

const HeaderTitle = styled(Text)`
	color: ${props => props.theme.colors.white};
	font-size: 18px;
	font-family: ${props => props.theme.fonts.bold};
	text-align: center;
	margin-top: 15px;
	margin-bottom: 25px;
`;

const Container = styled(ScrollView)`
	flex: 1;
	background-color: ${props => props.theme.colors.baseDark};
	padding-bottom: 50px;
`;

const RoundedImage = styled(Image)`
	width: 85px;
	height: 85px;
	border-radius: 85px;
	overflow: hidden;
	border: 2px solid #313d49;
	margin: 10px auto;
`;

const RoundedContainer = styled(View)`
	width: 85px;
	height: 85px;
	border-radius: 85px;
	overflow: hidden;
	border: 2px solid #313d49;
	margin: 10px auto;
	background: #313d49;
	align-items: center;
	justify-content: center;
`;

const ProfileName = styled(Text)`
	color: ${props => props.theme.colors.primary};
	font-size: 24px;
	font-family: ${props => props.theme.fonts.bold};
	text-align: center;
	line-height: 30px;
`;

const ProfileEmail = styled(Text)`
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
	border: 0px solid ${props => (props.active ? '#00C0D9' : 'transparent')};
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
	border: 0px solid #697c95;
	border-bottom-width: 1px;
	position: absolute;
	width: 100%;
`;


function getAttributeValue(attributes, attributeUrl) {
	const attr = attributes.find(item => item.type.url === attributeUrl);
	return attr && attr.data.value;
}

const TabList = [{
  id: 'overview',
  title: 'Overview',
  component: ProfileOverviewTab,
},
{
  id: 'did',
  title: 'DID',
  component: ProfileDIDTab,
},
 {
	id: 'applications',
	title: 'Applications',
	component: ProfileApplicationsTab,
}];

export function MyProfile(props) {
	const { profile } = props;
	const { basicAttributes = [], identity = {} } = profile;
	const [scrollY, setScrollY] = useState(0);

	const handleScroll = event => {
		setScrollY(event.nativeEvent.contentOffset.y);
  };

  const [activeTab, setActiveTab] = useState(TabList[0]);

	const showDid = profile && profile.identity && profile.identity.did;
	return (
		<Container onScroll={handleScroll} scrollEventThrottle={160}>
			<SafeAreaView style={{ position: 'relative' }}>
				<HeaderTitle>SelfKey Profile</HeaderTitle>
				<TouchableWithoutFeedback onPress={props.onPictureEdit}>
					{identity.profilePicture ? (
						<RoundedImage
							source={{
								uri: identity.profilePicture,
							}}
						/>
					) : (
						<RoundedContainer>
							<IconAddImage width={40} height={40} />
						</RoundedContainer>
					)}
				</TouchableWithoutFeedback>
				<ProfileName>
					{getAttributeValue(basicAttributes, FIRST_NAME_ATTRIBUTE)}{' '}
					{getAttributeValue(basicAttributes, LAST_NAME_ATTRIBUTE)}
				</ProfileName>
				<ProfileEmail>{getAttributeValue(basicAttributes, EMAIL_ATTRIBUTE)}</ProfileEmail>
				<TabMenu>
					<Row alignItems="flex-end">
            {
              TabList.filter((item) => (showDid || item.id !== 'did')).map((item) => (
                <TouchableWithoutFeedback onPress={() => setActiveTab(item)}>
                  <TabCol active={activeTab.id === item.id} autoWidth>
                    <TabTitle>{item.title}</TabTitle>
                  </TabCol>
                </TouchableWithoutFeedback>
              ))
            }
            <TabPlaceholder />
					</Row>
				</TabMenu>
				<activeTab.component {...props} scrollY={scrollY} />
			</SafeAreaView>
		</Container>
	);
}
