import React, { useState } from 'react';
import { MarketplaceProductDetails, ProductOverview, ProductRequirements } from '../components';
import { Box, FormattedNumber, Modal, Paragraph, ScreenContainer, Typography } from 'design-system';
import { Flag } from 'react-native-svg-flagkit';
// import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Toggler } from '../components/Toggler';
import { parseIncorporationOptions } from '../incorporations/utils';
import { Theme } from 'design-system/theme';
import { useDispatch, useSelector } from 'react-redux';
import { mkpActions, mkpOperations, mkpSelectors } from '../mkpSlice';
import { navigate, Routes } from 'core/navigation';
import { IconMarketplaceCredentials } from '../components/icons';

// const HTMLView = () => {};

const HTMLView = props => {
	return (
		<HTML
			html={props.value}
			baseFontStyle={{ color: 'white' }}
			tagsStyles={{
				ol: {
					backgroundColor: 'white',
				},
			}}
			listsPrefixesRenderers={{
				ul: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => (
					<Box
						width={4}
						height={4}
						backgroundColor="white"
						borderRadius={50}
						marginTop={5}
						marginRight={5}
					/>
				),
			}}
			{...props}
		/>
	);
};

// const IncorporationOverview = ({ details }) => (
// 	<Box>
// 		<Box>
// 			<Typography>offshoreIncomeTaxRate</Typography>
// 		</Box>
// 	</Box>
// );

const IncorporationCountryDetails = ({ details }) => {
	const { data } = details;

	return (
		<Box marginLeft={10} marginRight={10}>
			<HTMLView value={data.en.countryDetails} />
		</Box>
	);
};

const IncorporationOverview = ({ details }) => {
	const { data } = details;

	if (!data) {
		return null;
	}

	return (
		<Box marginLeft={10} marginRight={10} marginTop={10}>
			<Toggler
				items={[
					{
						id: 'whatYouGet',
						title: 'What You Get',
						body: <HTMLView value={data.walletDescription} />,
					},
					{
						id: 'description',
						title: 'Description',
						body: <HTMLView value={data.en.introduction} />,
					},
					{
						id: 'legal',
						title: 'Legal',
						body: <HTMLView value={data.en.legalParagraph} />,
					},
					{
						id: 'taxes',
						title: 'Taxes',
						body: <HTMLView value={data.en.taxesParagraph} />,
					},
					// {
					//   id: 'countryDetails',
					//   title: 'Country Details',
					//   body: <HTMLView value={data.en.countryDetails} />
					// }
				]}
			/>
		</Box>
	);
};

export default function ProductDetailsKeyFi(props) {
	const { details } = props;
	const dispatch = useDispatch();
	const handleSignUp = () => {
		return dispatch(mkpOperations.applyForApplication());
	};

	const handlePriceChange = id => {
		return dispatch(mkpActions.setSelectedPrice(id));
	};

	return (
		<ScreenContainer>
			<MarketplaceProductDetails
				title="KeyFi.com Credentials"
				lastApplication={props.lastApplication}
				paymentInProgress={props.paymentInProgress}
				headerTitle="KeyFi.com"
				logoComponent={<IconMarketplaceCredentials />}
				applyText="Apply"
				onSignUp={handleSignUp}
				onPay={props.onPay}
				onBack={() => navigate(Routes.MARKETPLACE_CATEGORIES)}
				onPriceChange={handlePriceChange}
				price={props.price}
				tabs={[
					{
						id: 'overview',
						title: 'Overview',
						component: () => (
							<Box padding={16}>
								<Typography>
									Investing and managing in DeFi has its complexity. With multiple DeFi platforms,
									this complexity tends to increase exponentially.
								</Typography>
								<Typography marginTop={8}>
									KeyFi.com is a first of its kind DeFi aggregator platform that lets you manage
									your investments among the top DeFi protocols with ease.
								</Typography>
								<Typography marginTop={8}>
									Powered by AI, KeyFi.com aims to prepare the DeFi ecosystem for regulatory
									compliance with a first of its kind decentralized user verification system backed
									by SelfKey Credentials.
								</Typography>
								<Typography marginTop={8}>
									Verify your Credentials now to enjoy the ease of managing multiple platforms, all
									while earning rewards and claiming a limited period KEY airdrop.
								</Typography>
							</Box>
						),
					},
				]}
			/>
		</ScreenContainer>
	);
}
