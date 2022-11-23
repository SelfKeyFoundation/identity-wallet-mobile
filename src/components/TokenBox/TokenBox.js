// @flow
import React, { useCallback } from 'react';
import {
	ScreenContainer,
	SKIcon,
	Grid,
	Col,
	Row,
	ThemeContext,
	ButtonLink,
	Paragraph,
	Explanatory,
	FormattedNumber,
} from 'design-system';
import styled from 'styled-components/native';
import { navigate, Routes } from 'core/navigation';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableHighlight } from 'react-native';
import { View, Text } from 'react-native';

export interface TokenBoxProps {
	iconComponent: any;
	tokenName: string;
	tokenCode: string;
	tokenAmount: number;
	fiatCurrency: string;
	fiatAmount: number;
}

const Title = styled(Text)`
	color: ${props => props.theme.colors.white};
	font-size: 18px;
	font-family: ${props => props.theme.fonts.regular};
	margin-top: 10px;
`;

const Wrapper = styled(View)`
	box-shadow: 2px 10px 24px rgba(0, 0, 0, 0.6);
`;

const Container = styled(LinearGradient)`
	background: #111111;
	padding: 15px 21px;
	border-radius: 16px;
`;

const TokenAmount = styled(Text)`
	color: ${props => props.theme.colors.white};
	font-size: 40px;
	font-family: ${props => props.theme.fonts.regular};
`;

const TokenSymbol = styled(Explanatory)`
	margin-bottom: 5px;
	margin-left: 5px;
	text-transform: uppercase;
`;

export function TokenBox(props: TokenBoxProps) {
	const TokenIcon = props.iconComponent;

	const handleDetails = useCallback(() => {
		navigate(Routes.TOKEN_DETAILS, {
			tokenId: props.tokenCode,
		});
	});

	const handleCustomTokens = useCallback(() => {
		navigate(Routes.CUSTOM_TOKENS);
	});

	if (props.tokenCode === 'custom') {
		return (
			<TouchableHighlight onPress={handleCustomTokens}>
				<Wrapper>
					<Container colors={['#161A1F', '#1A2836']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
						<Row marginBottom={10}>
							<Col autoWidth>
								<TokenIcon width={44} height={44} />
							</Col>
							<Col>
								<Title>{props.tokenName}</Title>
							</Col>
						</Row>
						<Row alignBottom marginBottom={10} marginTop={10}>
							<Col>
								<ButtonLink onPress={handleCustomTokens} iconName="icon-swap" iconSize={16}>
									Send & receive ERC-20 tokens
								</ButtonLink>
							</Col>
						</Row>
					</Container>
				</Wrapper>
			</TouchableHighlight>
		);
	}

	return (
		<TouchableHighlight onPress={handleDetails}>
			<Wrapper>
				<Container colors={['#161A1F', '#1A2836']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
					<Row marginBottom={10}>
						<Col autoWidth>
							<TokenIcon width={44} height={44} />
						</Col>
						<Col>
							<Title>{props.tokenName}</Title>
						</Col>
						<Col autoWidth>
							<TouchableHighlight onPress={handleDetails} style={{ padding: 6 }}>
								<SKIcon name="icon-swap" size={26} color="#93B0C1" />
							</TouchableHighlight>
						</Col>
					</Row>
					<Row alignBottom marginBottom={10}>
						<TokenAmount>
							<FormattedNumber value={props.tokenAmount || 0} decimal={8} digitLimit={9} />
						</TokenAmount>
						<TokenSymbol>{props.tokenCode}</TokenSymbol>
					</Row>
					<Row autoWidth alignBottom>
						<Explanatory>
							<FormattedNumber value={props.fiatAmount} currency={props.fiatCurrency} />
						</Explanatory>
					</Row>
				</Container>
			</Wrapper>
		</TouchableHighlight>
	);
}
