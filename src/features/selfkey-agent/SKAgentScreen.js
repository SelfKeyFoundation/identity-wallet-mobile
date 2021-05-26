import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Grid, Row, Col, FormText, IconAddImage, ScreenContainer, ScreenHeader, Box } from 'design-system';
import { navigateBack } from 'core/navigation';
import { SKAgentDID } from './SKAgentDID';
import { SKAgentCredentials } from './SKAgentCredentials';

const HeaderTitle = styled.Text`
	color: ${props => props.theme.colors.white};
	font-size: 18px;
	font-family: ${props => props.theme.fonts.bold};
	text-align: center;
	margin-top: 15px;
	margin-bottom: 25px;
`;

const Body = styled.ScrollView`
	flex: 1;
	background-color: ${props => props.theme.colors.baseDark};
	padding-bottom: 50px;
`;

const RoundedImage = styled.Image`
	width: 85px;
	height: 85px;
	border-radius: 85px;
	overflow: hidden;
	border: 2px solid #313d49;
	margin: 10px auto;
`;

const RoundedContainer = styled.View`
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

const TabList = [
	{
		id: 'credentials',
		title: 'Credentials',
		component: SKAgentCredentials, // SKAgentCredentials,
	},
	{
		id: 'did',
		title: 'DID',
		component: SKAgentDID,
	},
];

export function SKAgentScreen(props) {
	const [activeTab, setActiveTab] = useState(TabList[0]);

	return (
		<ScreenContainer>
			<ScreenHeader title="SK Agent" onBack={navigateBack} />
			<Body>
				<TabMenu>
					<Row alignItems="flex-end">
						{TabList.map(item => (
							<TouchableWithoutFeedback onPress={() => setActiveTab(item)}>
								<TabCol active={activeTab.id === item.id} autoWidth>
									<TabTitle>{item.title}</TabTitle>
								</TabCol>
							</TouchableWithoutFeedback>
						))}
						<TabPlaceholder />
					</Row>
				</TabMenu>
				<Box>
					<activeTab.component {...props} />
				</Box>
			</Body>
		</ScreenContainer>
	);
}
