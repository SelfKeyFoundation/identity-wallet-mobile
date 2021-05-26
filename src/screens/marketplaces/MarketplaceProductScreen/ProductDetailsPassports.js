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
		<Box marginLeft={10} marginRight={10} padding={8}>
			<HTMLView value={data.description.countryDetails} />
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
			<HTMLView value={data.description.countryDetails} />
			<Toggler
				items={
					[
						// {
						// 	id: 'whatYouGet',
						// 	title: 'What You Get',
						// 	body: <HTMLView value={data.description.countryDetails} />,
						// },
						// {
						// 	id: 'description',
						// 	title: 'Description',
						// 	body: <HTMLView value={data.en.introduction} />,
						// },
						// {
						// 	id: 'legal',
						// 	title: 'Legal',
						// 	body: <HTMLView value={data.en.legalParagraph} />,
						// },
						// {
						// 	id: 'taxes',
						// 	title: 'Taxes',
						// 	body: <HTMLView value={data.en.taxesParagraph} />,
						// },
						// {
						//   id: 'countryDetails',
						//   title: 'Country Details',
						//   body: <HTMLView value={data.en.countryDetails} />
						// }
					]
				}
			/>
		</Box>
	);
};

export default function ProductDetailsPassports(props) {
	const { details } = props;
	const dispatch = useDispatch();
	const handleSignUp = () => {
		return dispatch(mkpActions.setShowConfirmationModal(true));
	};

	console.log('#mzm details', details);

	return (
		<ScreenContainer>
			<MarketplaceProductDetails
				title={details.name}
				lastApplication={props.lastApplication}
				paymentInProgress={props.paymentInProgress}
				headerTitle="Passports & Residencies"
				logoComponent={details.data && <Flag id={details.data.countryCode} size={0.4} />}
				applyText="Apply Now"
				onSignUp={handleSignUp}
				onPay={props.onPay}
				onBack={props.onBack}
				price={{
					amount: details.data.price,
					currency: 'usd',
					cryptoCurrency: 'key',
				}}
				tabs={[
					{
						id: 'overview',
						title: 'Overview',
						component: () => <IncorporationOverview details={details} />,
					},
					{
						id: 'requirements',
						title: 'Requirements',
						component: () => (
							<ProductRequirements requirements={[]}>
								<HTMLView value={details.data.description.requirements} />
							</ProductRequirements>
						),
					},
					{
						id: 'countryDetails',
						title: 'Country Details',
						component: () => <IncorporationCountryDetails details={details} />,
					},
				]}
			/>
		</ScreenContainer>
	);
}
