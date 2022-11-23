/**
 * @flow
 */

import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { Box, Col, FormattedNumber, Grid, Row, Typography } from 'design-system';
import credentialIcon from './icons/assets/credentials.png';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-share';
import { Flag } from 'react-native-svg-flagkit';

const CardContainer = styled(View)`
	border: 0px solid ${props => (props.noBorder ? 'transparent' : props.color || '#38C0D1')};
	border-bottom-width: ${props => (props.noBorder ? '1px' : '8px')};
	border-right-width: 1px;
	border-right-color: transparent;
	border-radius: 4px;
	box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
`;

const Line = styled(View)`
	background: #475768;
	height: 1px;
`;

type MarketplaceItemProps = {
	onPress: Function,
};

export function ExchangesProductCard(props: MarketplaceItemProps) {
	const { data, type } = props;
	const title = data.name;
	const description = data.description;
	const logoImage = data.logo && data.logo[0].url;

	console.log(data);

	return (
		<Box style={props.style} onPress={props.onPress}>
			<LinearGradient
				colors={['#161A1F', '#1A2836']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{
					borderRadius: 4,
				}}
			>
				<Grid style={{ padding: 15, paddingBottom: 0, paddingTop: 8 }}>
					<Row alignItems="center" marginBottom={10}>
						<Col autoWidth>
							<Image
								source={{ uri: logoImage }}
								style={{
									width: 30,
									height: 30,
									borderRadius: 9,
								}}
							/>
							{/* <props.iconComponent /> */}
						</Col>
						<Col paddingLeft={8}>
							<Typography fontWeight="bold" fontSize={18} lineHeight={30} marginBottom={6}>
								{title}
							</Typography>
						</Col>
					</Row>
				</Grid>
				<Line />
				<Grid style={{ padding: 15 }}>
					<Row>
						<Typography
							textAlign="left"
							lineHeight={19}
							fontSize={13}
							color="#ADC8D8"
							marginRight={5}
						>
							Location:
						</Typography>
						<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
							{data.location[0]}
						</Typography>
						<Typography
							textAlign="left"
							lineHeight={19}
							fontSize={13}
							color="#ADC8D8"
							marginRight={5}
						>
							| Fees:
						</Typography>
						<Typography textAlign="left" lineHeight={19} fontSize={13}>
							{data.taker_fee}
						</Typography>
					</Row>
					{data.fiat_payments && (
						<Row marginTop={12}>
							<Typography
								textAlign="left"
								lineHeight={19}
								fontSize={13}
								color="#ADC8D8"
								marginRight={5}
							>
								Fiat Payments:
							</Typography>
							{data.fiat_payments.map(value => (
								<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
									{value}
								</Typography>
							))}
						</Row>
					)}
					{data.fiat_supported && (
						<Row marginTop={12}>
							<Typography
								textAlign="left"
								lineHeight={19}
								fontSize={13}
								color="#ADC8D8"
								marginRight={5}
							>
								Fiat Supported:
							</Typography>
							<Box
								flex={1}
								flexWrap="wrap"
								justifyContent="flex-start"
								alignItems="flex-start"
								flexDirection="row"
							>
								{data.fiat_supported.map(value => (
									<Box
										backgroundColor="#1E262E"
										borderRadius={20}
										padding={2}
										marginRight={4}
										marginBottom={4}
										paddingLeft={10}
										paddingRight={10}
									>
										<Typography textAlign="left" lineHeight={19} fontSize={10} color="#A1B9C9">
											{value}
										</Typography>
									</Box>
								))}
							</Box>
						</Row>
					)}
				</Grid>
			</LinearGradient>
		</Box>
	);
}

export function IncorporationProductCard(props: MarketplaceItemProps) {
	const item = props.data;
	// const title = data.name;
	// const description = data.description;
	// const logoImage = data.logo && data.logo[0].url;

	console.log(item);

	return (
		<Box style={props.style} onPress={props.onPress}>
			<LinearGradient
				colors={['#161A1F', '#1A2836']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{
					borderRadius: 4,
				}}
			>
				<Grid style={{ padding: 15, paddingBottom: 0, paddingTop: 8 }}>
					<Row alignItems="center" marginBottom={10}>
						<Col autoWidth>
							{/* <Image
								source={{ uri: logoImage }}
								style={{
									width: 30,
									height: 30,
									borderRadius: 9,
								}}
							/> */}
							<Flag id={item.data.countryCode} size={0.17} />
							{/* <props.iconComponent /> */}
						</Col>
						<Col paddingLeft={8}>
							<Typography fontWeight="bold" fontSize={18} lineHeight={30} marginBottom={6}>
								{item.data.region}
							</Typography>
						</Col>
						<Col autoWidth>
							<Typography textAlign="right" fontSize={18}>
								<FormattedNumber value={parseFloat(item.price)} currency="USD" />
							</Typography>
							<Typography textAlign="right" fontSize={13} color="#ccc">
								<FormattedNumber value={parseFloat(item.price)} currency="KEY" convertFromUsd />
							</Typography>
						</Col>
					</Row>
				</Grid>
				<Line />
				<Grid style={{ padding: 15 }}>
					<Row>
						<Typography
							textAlign="left"
							lineHeight={19}
							fontSize={13}
							color="#ADC8D8"
							marginRight={5}
						>
							ENTITY:
						</Typography>
						<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
							{item.data.acronym && item.data.acronym[0]}
						</Typography>
					</Row>
					<Row marginTop={12}>
						<Typography
							textAlign="left"
							lineHeight={19}
							fontSize={13}
							color="#ADC8D8"
							marginRight={5}
						>
							OFFSH TAX:
						</Typography>
						<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
							{item.data.offshoreIncomeTaxRate}
						</Typography>
						<Typography
							textAlign="left"
							lineHeight={19}
							fontSize={13}
							color="#ADC8D8"
							marginRight={5}
						>
							| CORP TAX:
						</Typography>
						<Typography textAlign="left" lineHeight={19} fontSize={13}>
							{item.data.corporateTaxRate}
						</Typography>
					</Row>
					{item.data.goodFor && (
						<Row marginTop={12}>
							<Typography
								textAlign="left"
								lineHeight={19}
								fontSize={13}
								color="#ADC8D8"
								marginRight={5}
							>
								Good For:
							</Typography>
							<Box
								flex={1}
								flexWrap="wrap"
								justifyContent="flex-start"
								alignItems="flex-start"
								flexDirection="row"
							>
								{item.data.goodFor.map(value => (
									<Box
										backgroundColor="#1E262E"
										borderRadius={20}
										padding={2}
										marginRight={4}
										marginBottom={4}
										paddingLeft={10}
										paddingRight={10}
									>
										<Typography textAlign="left" lineHeight={19} fontSize={10} color="#A1B9C9">
											{value}
										</Typography>
									</Box>
								))}
							</Box>
						</Row>
					)}
				</Grid>
			</LinearGradient>
		</Box>
	);
}

export function PassportsProductCard(props: MarketplaceItemProps) {
	const item = props.data;
	const isPassport = item.data.showInPassportApp;

	// const title = data.name;
	// const description = data.description;
	// const logoImage = data.logo && data.logo[0].url;

	console.log('PassportsProductCard', item);

	const renderPassportDescription = () => (
		<Grid style={{ padding: 15 }}>
			<Row>
				<Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8" marginRight={5}>
					Type:
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
					<Box
						backgroundColor="#1E262E"
						borderRadius={20}
						padding={2}
						marginRight={4}
						marginBottom={4}
						paddingLeft={10}
						paddingRight={10}
					>
						<Typography textAlign="left" lineHeight={19} fontSize={10} color="#A1B9C9">
							Citizenship
						</Typography>
					</Box>
				</Typography>
			</Row>
			<Row marginTop={12}>
				<Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8" marginRight={5}>
					Visa Free Travel:
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
					{item.data.visaFree}
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8" marginRight={5}>
					| CORP TAX:
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13}>
					{item.data.corporateTaxRate}
				</Typography>
			</Row>
		</Grid>
	);

	const renderResidencyDescription = () => (
		<Grid style={{ padding: 15 }}>
			<Row marginTop={12}>
				<Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8" marginRight={5}>
					Time To Residency:
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
					{item.data.timeToPermanentResidencyYears}
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8" marginRight={5}>
					| Time To Citizenship:
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13}>
					{item.data.timeToCitizenship}
				</Typography>
			</Row>
			<Row marginTop={12}>
				<Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8" marginRight={5}>
					Investment Type:
				</Typography>
				<Box
					flex={1}
					flexWrap="wrap"
					justifyContent="flex-start"
					alignItems="flex-start"
					flexDirection="row"
				>
					{item.data.programTypeResidencyVsCitizenshipOnly.map(value => (
						<Box
							backgroundColor="#1E262E"
							borderRadius={20}
							padding={2}
							marginRight={4}
							marginBottom={4}
							paddingLeft={10}
							paddingRight={10}
						>
							<Typography textAlign="left" lineHeight={19} fontSize={10} color="#A1B9C9">
								{value}
							</Typography>
						</Box>
					))}
				</Box>
			</Row>
			<Row marginTop={12}>
				<Typography textAlign="left" lineHeight={19} fontSize={13} color="#ADC8D8" marginRight={5}>
					Investment Amount:
				</Typography>
				<Typography textAlign="left" lineHeight={19} fontSize={13} marginRight={5}>
					{item.data.investmentAmountSingleApplicant}
				</Typography>
			</Row>
		</Grid>
	);

	return (
		<Box style={props.style} onPress={props.onPress}>
			<LinearGradient
				colors={['#161A1F', '#1A2836']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{
					borderRadius: 4,
				}}
			>
				<Grid style={{ padding: 15, paddingBottom: 0, paddingTop: 8 }}>
					<Row alignItems="center" marginBottom={10}>
						<Col autoWidth>
							{/* <Image
								source={{ uri: logoImage }}
								style={{
									width: 30,
									height: 30,
									borderRadius: 9,
								}}
							/> */}
							<Flag id={item.data.countryCode} size={0.17} />
							{/* <props.iconComponent /> */}
						</Col>
						<Col paddingLeft={8}>
							<Typography fontWeight="bold" fontSize={18} lineHeight={30} marginBottom={6}>
								{item.data.region}
							</Typography>
						</Col>
						<Col autoWidth>
							<Typography textAlign="right" fontSize={18}>
								<FormattedNumber value={parseFloat(item.data.price)} currency="USD" />
							</Typography>
							<Typography textAlign="right" fontSize={13} color="#ccc">
								<FormattedNumber
									value={parseFloat(item.data.price)}
									currency="KEY"
									convertFromUsd
								/>
							</Typography>
						</Col>
					</Row>
				</Grid>
				<Line />
				{isPassport ? renderPassportDescription() : renderResidencyDescription()}
			</LinearGradient>
		</Box>
	);
}

export function ProductCard(props: MarketplaceItemProps) {
	const { data } = props;

	if (data.type === 'incorporations') {
		return <IncorporationProductCard {...props} />;
	}

	if (data.type === 'passports') {
		return <PassportsProductCard {...props} />;
	}

	if (data.type === 'exchanges') {
		return <ExchangesProductCard {...props} />;
	}

	return null;
}
