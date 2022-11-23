import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { DocumentsEmptyAlert } from '../../../components';
import { Grid, Row, Col, SKIcon, Button, H3, Paragraph, Box, Typography } from 'design-system';
import { ActivityIndicator, Clipboard, Linking, View } from 'react-native';
import ducks from 'core/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, navigate } from 'core/navigation';
import moment from 'moment';
import { ArrowIcon } from 'components/Toggler/ArrowIcon';
import { Theme } from 'design-system/theme';
import { mkpOperations } from 'screens/marketplaces/mkpSlice';

const SectionHeader = styled(Grid)`
	margin: 15px 20px 0 20px;
`;

const SectionTitle = styled(Text)`
	color: ${props => props.theme.colors.white};
	font-size: 24px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 30px;
`;

const SectionDescription = styled(Text)`
	color: ${props => props.theme.colors.typography};
	font-size: 16px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 24px;
`;

const EmptyItemsConatiner = styled(View)`
	margin: 20px;
`;

const ApplicationItem = styled(Grid)`
	border: 0px solid #475768;
	border-bottom-width: 1px;
	padding: 20px;
`;

function resolveTitle(title) {
	if (title === 'Marketplace Test Template') {
		return 'Incorporation application';
	}

	return title;
}

export function ProfileApplicationsTab() {
	const dispatch = useDispatch();
	const applications = useSelector(ducks.kyc.selectors.selectApplications);
	const [activeApplication, setActiveApplication] = useState();

	useEffect(() => {
		dispatch(ducks.kyc.operations.loadRelyingPartyOperation('selfkey'));
	}, []);

	if (!applications) {
		return (
			<View style={{ marginTop: 40 }}>
				<ActivityIndicator size="small" color="#00C0D9" />
				<Typography textAlign="center" marginTop={10}>
					Loading...
				</Typography>
			</View>
		);
	}

	return (
		<View>
			<Box margin={20}>
				<Typography fontSize={24} lineHeight={30}>
					Marketplace Applications
				</Typography>
				<Typography fontSize={16} lineHeight={24} color="#93B0C1">
					{applications.length} applications
				</Typography>
			</Box>
			{applications.map((application, idx) => {
				console.log('kyc applicaiton', application);
				const isActive = activeApplication === application.id;
				return (
					<ApplicationItem>
						<Box onPress={() => setActiveApplication(isActive ? null : application.id)}>
							<Box row>
								<Box col>
									<Typography fontSize={15} lineHeight={22} fontWeight="bold">
										{resolveTitle(application.title)}
									</Typography>
								</Box>
								<Box col autoWidth>
									{/* <SKIcon name="icon-arrow-expand" size={8} color="#93B0C1" /> */}
									<ArrowIcon expanded={isActive} />
								</Box>
							</Box>
							<Box row>
								<Box col autoWidth>
									<Box
										backgroundColor="#262F39"
										padding={5}
										borderRadius={4}
										flexDirection="row"
										alignItems="center"
									>
										<SKIcon name="icon-hourglass" size={9} color="#ADC8D8" />
										<Typography marginLeft={10} fontSize={10} fontWeight="bold" lineHeight={12}>
											{application.currentStatusName}
										</Typography>
									</Box>
								</Box>
							</Box>
							{application.currentStatus === 9 ? (
								<Box>
									<Typography marginTop={10} marginBottom={10} fontSize={13}>
										Requires additional information
									</Typography>
									<Button
										onPress={() => {
											dispatch(mkpOperations.redirectToKyc(application));
										}}
									>
										Complete application
									</Button>
								</Box>
							) : null}
							{application.currentStatus === 2 ? (
								<Button onPress={() => {
									Linking.openURL('https://keyfi.com')
								}}>Visit KeyFi.com</Button>
							) : null}
						</Box>
						{isActive ? (
							<Box>
								<Box row>
									<Box col autoWidth>
										<Typography color={Theme.colors.typography}>Application Date</Typography>
									</Box>
									<Box col>
										<Typography>{moment(application.createdAt).format('DD MMM YYYY')}</Typography>
									</Box>
								</Box>
							</Box>
						) : null}
					</ApplicationItem>
				);
			})}
		</View>
	);
}
