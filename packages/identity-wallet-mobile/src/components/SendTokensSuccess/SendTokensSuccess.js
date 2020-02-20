/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components/native';
import {
	ScreenContainer,
	Modal,
	Button,
	SKIcon,
	Grid,
	Col,
	Row,
	ThemeContext,
	H3,
	Ammount,
	Paragraph,
	Explanatory,
	DefinitionTitle,
	FormattedNumber,
} from '@selfkey/mobile-ui';

const Body = styled.View``;

function formatAddress(address) {
	if (!address) {
		return ''
	}

	const firstPart = address.substring(0, 12);
	const lastPart = address.substring(address.length - 6, address.length);

	return `${firstPart}...${lastPart}`.toLowerCase();
}

const BorderGrid = styled(Grid)`
	padding: 25px 15px;
	border-color: #475768;
	border-bottom-width: 1px;
`;

type SendTokensSuccessProps = {
	token: string,
	tokenAmount: number,
	fiatAmount: number,
	remainingBalance: number,
	networkFee: number,
	addressTo: string,
	txId: string,
};

export function SendTokensSuccess(props: SendTokensSuccessProps) {
	return (
		<Body>
			<BorderGrid>
				<Row justifyContent="center" marginBottom={9}>
					<Col noPadding autoWidth>
						<SKIcon name="icon-big-ok" size={66} color="#0ABBD0" />
					</Col>
				</Row>
				<Row justifyContent="center" marginBottom={8}>
					<Col noPadding autoWidth>
						<H3>Sent!</H3>
					</Col>
				</Row>
				<Row justifyContent="center" marginBottom={3}>
					<Col autoWidth noPadding>
						<Ammount>
							<FormattedNumber value={props.tokenAmount} currency={props.token} decimal={props.tokenDetails.decimal} />
						</Ammount>
					</Col>
				</Row>
				<Row justifyContent="center">
					<Col autoWidth noPadding>
						<Explanatory>
							<FormattedNumber value={props.fiatAmount} currency="usd" />
						</Explanatory>
					</Col>
				</Row>
			</BorderGrid>
			<BorderGrid>
				<Row>
					<Col autoWidth>
						<DefinitionTitle>Sent To</DefinitionTitle>
					</Col>
					<Col>
						<H3 style={{ textAlign: 'right' }}>{formatAddress(props.addressTo)}</H3>
					</Col>
				</Row>
			</BorderGrid>
			<BorderGrid>
				<Row>
					<Col autoWidth>
						<DefinitionTitle>Remaining Balance</DefinitionTitle>
					</Col>
					<Col>
						<H3 style={{ textAlign: 'right' }}>
							<FormattedNumber value={props.remainingBalance} currency={props.token} decimal={props.tokenDetails.decimal} />
						</H3>
					</Col>
				</Row>
				<Row marginTop={10}>
					<Col autoWidth>
						<DefinitionTitle>Network Fee</DefinitionTitle>
					</Col>
					<Col>
						<H3 style={{ textAlign: 'right' }}>
							<FormattedNumber value={props.networkFee} currency="eth" decimal={10} />
						</H3>
					</Col>
				</Row>
			</BorderGrid>
			<BorderGrid>
				<Row>
					<Col>
						<Button onPress={props.onViewOnEtherscan}>View on Etherscan</Button>
					</Col>
				</Row>
			</BorderGrid>
		</Body>
	);
}
