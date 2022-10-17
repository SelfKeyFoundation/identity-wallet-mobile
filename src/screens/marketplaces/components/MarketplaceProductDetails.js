/**
 * @flow
 */

import React, { useState } from 'react';
import { Image, Linking, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import {
	Box,
	Button,
	Col,
	FormText,
	Grid,
	Row,
	SKIcon,
	Typography,
	ScreenHeader,
	FormattedNumber,
	Alert,
} from 'design-system';
import { Theme } from 'design-system/theme';
import { useSelector } from 'react-redux';
import { mkpSelectors } from '../mkpSlice';
import { ApplicationStatus } from 'core/modules/kyc/selectors';
import { NetworkStore } from 'core/modules/app/NetworkStore';
// import productIcon from './assets/product-icon.png';

// const Box = styled.View`
// 	background: #293743;
// 	border: 2px solid #1ca9ba;
// 	padding: 35px 20px;
// 	align-items: center;
// 	justify-content: center;
// 	border-radius: 4px;
// `;

const HeaderGrid = styled(Grid)`
	margin: 0 20px;
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

type MarketplaceProductDetailsProps = {
	onBack: Function,
	onSignUp: Function,
};

function ProductPrice({ price, onPriceChange }) {
	if (!price) {
		return null;
	}

	const renderPrice = (item, idx) => {
		return (
		<Col>
			<Box
				row
				alignItems="flex-start"
				justifyContent="flex-start"
				onPress={() => onPriceChange(item.id)}
			>
				{!idx ? (
					<Typography
						textAlign="right"
						fontWeight="regular"
						fontSize={18}
						lineHeight={30}
						marginRight={6}
						color=""
					>
						Pricing:
					</Typography>
				) : null}
				<Box borderWidth={item.isActive ? 1 : 0} borderColor={Theme.colors.primary} padding={8}>
					<Typography textAlign="right" fontWeight="bold" fontSize={22} lineHeight={30} color="">
						<FormattedNumber value={item && item.amount} currency="usd" cleanEmptyDecimals />
					</Typography>
					<Typography
						textAlign="right"
						fontWeight="regular"
						fontSize={16}
						lineHeight={30}
						color="#ccc"
					>
						<FormattedNumber
							value={item && item.amount}
							currency={item && item.cryptoCurrency}
							decimal={item.cryptoCurrency === NetworkStore.getNetwork().symbol.toLowerCase() ? 8 : 3}
							cleanEmptyDecimals
							convertFromUsd
						/>
					</Typography>
				</Box>
			</Box>
		</Col>
		);
	};

	if (Array.isArray(price)) {
		return price.map(renderPrice);
	}

	return (
		<Col>
			<Box row alignItems="flex-start" justifyContent="flex-start">
				<Typography
					textAlign="right"
					fontWeight="regular"
					fontSize={18}
					lineHeight={30}
					marginRight={6}
					color=""
				>
					Pricing:
				</Typography>
				<Box>
					<Typography textAlign="right" fontWeight="bold" fontSize={22} lineHeight={30} color="">
						<FormattedNumber value={price && price.amount} currency="usd" cleanEmptyDecimals />
					</Typography>
					<Typography
						textAlign="right"
						fontWeight="regular"
						fontSize={16}
						lineHeight={30}
						color="#ccc"
					>
						<FormattedNumber
							value={price && price.amount}
							currency={price && price.cryptoCurrency}
							decimal={price.cryptoCurrency === NetworkStore.getNetwork().symbol.toLowerCase() ? 8 : 3}
							cleanEmptyDecimals
							convertFromUsd
						/>
					</Typography>
				</Box>
			</Box>
		</Col>
	);
}

export function MarketplaceProductDetails(props: MarketplaceProductDetailsProps) {
	const [activeTab, setActiveTab] = useState(props.tabs[0]);
	const [isLoading, setLoading] = useState();
	const { lastApplication } = props;
	const selectedPrice = useSelector(mkpSelectors.getSelectedPrice);
	const isActive = useSelector(mkpSelectors.getProductActive);

	const handleSignup = () => {
		setLoading(true);
		setTimeout(() => {
			Promise.resolve(props.onSignUp()).then(() => {
				setLoading(false);
			})	
		}, 200);		
	}

	const renderApplyButton = () => {
		// TODO: Remove workaround for PoC
		const status = null // lastApplication && lastApplication.status;

		if (!isActive) {
			return (
				<Box
					borderWidth={1}
					borderColor={Theme.colors.baseLight}
					backgroundColor={Theme.colors.base}
					padding={12}
				>
					<Box row marginBottom={8} alignItems="center">
						<Box col autoWidth width={30}>
							<SKIcon name="icon-shield-info" size={24} color={Theme.colors.warning} />
						</Box>
						<Box col>
							<Typography color={Theme.colors.typography}>
								This product is not currently available
							</Typography>
						</Box>
					</Box>
				</Box>
			);
		}

		if (selectedPrice && status === ApplicationStatus.unpaid) {
			return (
				<Box
					borderWidth={1}
					borderColor={Theme.colors.baseLight}
					backgroundColor={Theme.colors.base}
					padding={12}
				>
					<Box row marginBottom={8} alignItems="center">
						<Box col autoWidth width={30}>
							<SKIcon name="icon-shield-info" size={24} color={Theme.colors.error} />
						</Box>
						<Box col autoWidth>
							<Typography color={Theme.colors.typography}>
								You have an existing unpaid application
							</Typography>
						</Box>
					</Box>
					<Box marginTop={10}>
						<Button onPress={props.onPay}>Pay</Button>
					</Box>
				</Box>
			);
		}

		if (status === ApplicationStatus.rejected) {
			return (
				<Box
					borderWidth={1}
					borderColor={Theme.colors.baseLight}
					backgroundColor={Theme.colors.base}
					padding={12}
				>
					<Box row marginBottom={8} alignItems="center">
						<Box col autoWidth width={30}>
							<SKIcon name="icon-shield-info" size={24} color={Theme.colors.error} />
						</Box>
						<Box col autoWidth>
							<Typography color={Theme.colors.typography}>
								Your previous application was rejected
							</Typography>
						</Box>
					</Box>
					{/* <Box marginTop={10}>
						<Button onPress={props.onPay}>Pay</Button>
					</Box> */}
				</Box>
			);
		}
		
		if (status === ApplicationStatus.additionalRequirements) {
			return (
				<Box
					borderWidth={1}
					borderColor={Theme.colors.baseLight}
					backgroundColor={Theme.colors.base}
					padding={12}
				>
					<Box row marginBottom={8} alignItems="center">
						<Box col autoWidth width={30}>
							<SKIcon name="icon-shield-info" size={24} color={Theme.colors.error} />
						</Box>
						<Box col autoWidth>
							<Typography color={Theme.colors.typography}>
								Your existing application requires additional information
							</Typography>
						</Box>
					</Box>
					<Box marginTop={10}>
						<Button onPress={props.onSubmitAdditionalInfo}>Complete Application</Button>
					</Box>
				</Box>
			);
		}

		if (props.paymentInProgress) {
			return (
				<Box
					borderWidth={1}
					borderColor={Theme.colors.baseLight}
					backgroundColor={Theme.colors.base}
					padding={12}
				>
					<Box row marginBottom={8} alignItems="center">
						<Box col autoWidth width={30}>
							<SKIcon name="icon-shield-info" size={24} color={Theme.colors.error} />
						</Box>
						<Box col autoWidth>
							<Typography color={Theme.colors.typography}>
								There is a payment in progress
							</Typography>
						</Box>
					</Box>
					{/* <Box marginTop={10}>
						<Button onPress={props.onPay}>Pay</Button>
					</Box> */}
				</Box>
			);
		}
		
		if (status === ApplicationStatus.completed) {
			return (
				<Box
					borderWidth={1}
					borderColor={Theme.colors.baseLight}
					backgroundColor={Theme.colors.base}
					padding={12}
				>
					<Box row marginBottom={8} alignItems="center">
						<Box col autoWidth width={30}>
							<SKIcon name="icon-shield-check" size={24} color={Theme.colors.success} />
						</Box>
						<Box col autoWidth>
							<Typography color={Theme.colors.typography}>
								Your application is approved
							</Typography>
						</Box>
						
					</Box>
					<Button onPress={() => {
						Linking.openURL('https://keyfi.com')
					}}>Visit KeyFi.com</Button>
				</Box>
			);
		}

		if (status) {
			return (
				<Box
					borderWidth={1}
					borderColor={Theme.colors.baseLight}
					backgroundColor={Theme.colors.base}
					padding={12}
				>
					<Box row marginBottom={8} alignItems="center">
						<Box col autoWidth width={30}>
							<SKIcon name="icon-shield-info" size={24} color={Theme.colors.warning} />
						</Box>
						<Box col autoWidth>
							<Typography color={Theme.colors.typography}>
								You have an existing in progress application
							</Typography>
						</Box>
					</Box>
				</Box>
			);
		}

		return <Button onPress={handleSignup} isLoading={isLoading}>{props.applyText}</Button>;
	};

	return (
		<>
			<ScreenHeader title={props.headerTitle} onBack={props.onBack} />
			<ScrollView>
				<View>
					<HeaderGrid>
						<Row justifyContent="center" marginTop={20}>
							<Col autoWidth>
								{/* <Image
                  source={productIcon}
                  style={{
                    width: 94 * 0.6,
                    height: 117 * 0.6,
                    marginBottom: 0
                  }}
                /> */}
								{props.logoComponent}
							</Col>
						</Row>
						<Row justifyContent="center">
							<Col autoWidth>
								<Typography
									fontWeight="bold"
									fontSize={24}
									lineHeight={30}
									marginBottom={6}
									color="#58E9FF"
								>
									{props.title}
								</Typography>
							</Col>
						</Row>
						<Row>
							<ProductPrice price={props.price} onPriceChange={props.onPriceChange} />
						</Row>
						<Row justifyContent="center">
							<Col>{renderApplyButton()}</Col>
						</Row>
					</HeaderGrid>
					{props.overviewComponent}
					<TabMenu>
						<Row alignItems="flex-end">
							{props.tabs.map(item => (
								<TouchableWithoutFeedback onPress={() => setActiveTab(item)}>
									<TabCol active={activeTab.id === item.id} autoWidth>
										<TabTitle>{item.title}</TabTitle>
									</TabCol>
								</TouchableWithoutFeedback>
							))}
							<TabPlaceholder />
						</Row>
					</TabMenu>
					{<activeTab.component />}
				</View>
			</ScrollView>
		</>
	);
}
