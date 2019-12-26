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
import { TouchableWithoutFeedback } from 'react-native';

const Body = styled.View``;

function formatAddress(address) {
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
	padding: 25px 15px;
`;

const AddressText  = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.bold};
`;

type SendTokensErrorProps = {
	address: string,
	onQRCode: string,
	onCopy: string,
	errorMessage: string,
	errorDescription: string,
};

export function SendTokensError(props: SendTokensErrorProps) {
	return (
		<Modal {...props} title="Send Custom Tokens" footer={null} noBodyPadding>
			<Body>
				<BorderGrid>
					<Row justifyContent="center" marginBottom={9}>
						<Col noPadding autoWidth>
							<SKIcon name="icon-warning-large" size={66} color="#DB7400" />
						</Col>
					</Row>
					<Row justifyContent="center" marginBottom={10}>
						<Col noPadding autoWidth>
							<H3>Transaction Failed</H3>
						</Col>
					</Row>
					<Row justifyContent="center">
						<Col autoWidth>
							<Paragraph>
								{ props.errorMessage }
							</Paragraph>
						</Col>
					</Row>
					<Row justifyContent="center">
						<TouchableWithoutFeedback onPress={props.onInfo}>
							<Col autoWidth>
								<Explanatory>
									{ props.errorInfo }
								</Explanatory>
							</Col>
						</TouchableWithoutFeedback>
					</Row>
				</BorderGrid>
				<Footer>
					<Row>
						<Col>
							<DefinitionTitle>Your Address</DefinitionTitle>
						</Col>
					</Row>
					<Row marginBottom={15}>
						<Col>
							<AddressText>{props.address}</AddressText>
						</Col>
					</Row>
					<Row marginBottom={8}>
						<Col>
							<Button
								type="shell-primary"
								onPress={props.onCopy}
								icon={<SKIcon name="icon-copy" size={24} color="#00C0D9" />}
								buttonStyle={{
									height: 50,
								}}
								contentStyle={{
									height: 47,
								}}
							>
									Copy
							</Button>
						</Col>
						<Col>
							<Button
								type="shell-primary"
								onPress={props.onQRCode}
								icon={<SKIcon name="icon-qr" size={24} color="#00C0D9" />}
								buttonStyle={{
									height: 50,
								}}
								contentStyle={{
									height: 47,
								}}
							>
								QR Code
							</Button>
						</Col>
					</Row>
				</Footer>
			</Body>
		</Modal>
	);
}
