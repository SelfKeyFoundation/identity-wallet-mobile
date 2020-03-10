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
import dateFormat from 'dateformat';

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

const Footer = styled(Grid)`
	padding: 25px 15px 50px 15px;
`;

type TransactionDetailsProps = {
	token: string,
	tokenAmount: number,
	fiatAmount: number,
	remainingBalance: number,
	networkFee: number,
	addressTo: string,
	txId: string,
};

const statusMap = {
	'received': 'Received',
	'sent': 'Sent',
	'receiving': 'Receiving',
	'sending': 'Sending',
}

export function TransactionDetails(props: TransactionDetailsProps) {
	return (
		<Body>
			<BorderGrid>
				<Row justifyContent="center" marginBottom={9}>
					<Col noPadding autoWidth>
						<SKIcon name="icon-sent-large-1" size={66} color="#647A86" />
					</Col>
				</Row>
				<Row justifyContent="center" marginBottom={8}>
					<Col noPadding autoWidth>
						<H3>{statusMap[props.status]} {props.token && props.token.toUpperCase()}</H3>
					</Col>
				</Row>
				<Row justifyContent="center" marginBottom={3}>
					<Col autoWidth noPadding>
						<Ammount>
							<FormattedNumber
								value={props.tokenAmount}
								currency={props.token}
								decimal={props.tokenDecimal}
							/>
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
						<DefinitionTitle>From</DefinitionTitle>
					</Col>
					<Col>
						<H3 style={{ textAlign: 'right' }}>{formatAddress(props.addressFrom)}</H3>
					</Col>
				</Row>
				<Row>
					<Col autoWidth>
						<DefinitionTitle>To</DefinitionTitle>
					</Col>
					<Col>
						<H3 style={{ textAlign: 'right' }}>{formatAddress(props.addressTo)}</H3>
					</Col>
				</Row>
			</BorderGrid>
			<BorderGrid>
				<Row>
					<Col autoWidth>
						<DefinitionTitle>Date</DefinitionTitle>
					</Col>
					<Col>
						<H3 style={{ textAlign: 'right' }}>
							{
								dateFormat(props.date, 'dd mmm yyyy')
							}
						</H3>
					</Col>
				</Row>
				<Row>
					<Col autoWidth>
						<DefinitionTitle>Status</DefinitionTitle>
					</Col>
					<Col>
						<H3 style={{ textAlign: 'right' }}>
							{ props.isError ? 'Error' : 'Complete' }
						</H3>
					</Col>
				</Row>
			</BorderGrid>
			<Footer>
				<Row>
					<Col>
						<Button onPress={props.onViewOnEtherscan}>View on Etherscan</Button>
					</Col>
				</Row>
			</Footer>
		</Body>
	);
}
