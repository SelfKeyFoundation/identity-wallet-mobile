import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, RefreshControl, Image, Clipboard } from 'react-native';
import {
	TokenBoxCarouselContainer,
	MyTokensContainer,
	TxHistoryContainer,
	SelectBox,
} from '../../components';
import { ScreenContainer, Grid, Row, Col, Button, SKIcon, Box, Typography } from 'design-system';
import { WalletTracker } from '../../WalletTracker';
import { navigate, Routes } from 'core/navigation';
import QRCodeIcon from './qr-code-icon.png';
import { Theme } from 'design-system/theme';
import { useDispatch, useSelector } from 'react-redux';
import modules from 'core/modules';
import { compactAddress } from 'core/utils/wallet-utils';
import { NetworkMapping } from 'core/modules/app/NetworkStore';
import RNPickerSelect from 'react-native-picker-select';

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
	background-color: ${props => props.theme.colors.baseDark};
`;

const CarouselRow = styled.View`
	margin-top: 25px;
`;

const MyTokensRow = styled.View`
	margin: -10px 20px 10px 20px;
`;

const TxHistoryRow = styled.View`
	margin: 20px 20px 50px 20px;
`;

function WalletHeader() {
	const address = useSelector(modules.wallet.selectors.getAddress);
	const dispatch = useDispatch();
	const network = useSelector(modules.app.selectors.getNetwork);

	console.log(NetworkMapping);

	return (
		<Box>
			<Box justifyContent="center" alignItems="center" flexDirection="row">
				<Box
					autoWidth
					col
					backgroundColor="#161A1F"
					borderRadius={12}
					paddingLeft={16}
					paddingRight={16}
					paddingTop={4}
					paddingBottom={4}
					onPress={() => {
						Clipboard.setString(address);
						dispatch(modules.app.actions.setSnackMessage('Address copied.'));
					}}
				>
					<Typography fontSize={14}>{compactAddress(address)}</Typography>
				</Box>

				<Box
					autoWidth
					col
					backgroundColor="#161A1F"
					borderRadius={12}
					paddingLeft={16}
					paddingRight={16}
					paddingTop={7}
					paddingBottom={7}
					marginLeft={5}
					width={170}
				>
					<RNPickerSelect
						value={network.id}
						items={Object.keys(NetworkMapping).map(key => ({
							label: NetworkMapping[key].name,
							value: parseInt(key),
							key: parseInt(key),
							color: '#000',
						}))}
						fixAndroidTouchableBug
						useNativeAndroidPickerStyle={false}
						style={{
							padding: 0,
						}}
						textInputProps={{
							fontSize: 14,
							color: '#fff',
							padding: 0,
						}}
						onValueChange={value => {
							dispatch(modules.app.operations.setNetwork(value));
						}}
					/>
				</Box>

				<Box
					col
					autoWidth
					marginLeft={5}
					onPress={() => {
						navigate(Routes.APP_SCAN_QR);
					}}
				>
					<Image source={QRCodeIcon} style={{ width: 24, height: 24 }} />
				</Box>
			</Box>
		</Box>
	);
}

export function Dashboard(props) {
	const handleRefresh = () => {
		WalletTracker.trackEvent({
			category: `${TRACKER_PAGE}/refreshButton`,
			action: 'press',
			level: 'machine',
		});

		props.onRefresh();
	};

	const featureFlags = useSelector(modules.app.selectors.getFeatureFlags);

	return (
		<Container>
			<SafeAreaView>
				<WalletHeader />
				<HeaderTitle>Dashboard</HeaderTitle>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={props.refreshing} onRefresh={handleRefresh} />
					}
				>
					<CarouselRow>
						<TokenBoxCarouselContainer />
					</CarouselRow>
					{featureFlags.moonpay ? (
						<Box padding={20} marginBottom={30}>
							<Button onPress={props.onOpenMoonpay}>Buy KEY tokens</Button>
						</Box>
					) : null}
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
