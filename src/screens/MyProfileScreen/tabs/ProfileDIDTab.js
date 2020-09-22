import React, { useState } from 'react';
import styled from 'styled-components/native';
import { DocumentsEmptyAlert } from '../../../components';
import { Grid, Row, Col, SKIcon, Button, H3, Paragraph } from 'design-system';
import { Clipboard } from 'react-native';
import ducks from 'core/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, navigate } from 'core/navigation';

const SectionHeader = styled(Grid)`
	margin: 15px 20px 0 20px;
`;

const SectionTitle = styled.Text`
	color: ${props => props.theme.colors.white};
	font-size: 24px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 30px;
`;

const SectionDescription = styled.Text`
	color: ${props => props.theme.colors.typography};
	font-size: 16px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 24px;
`;

const EmptyItemsConatiner = styled.View`
	margin: 20px;
`;

export function ProfileDIDTab() {
	const dispatch = useDispatch();
	const identity = useSelector(ducks.identity.selectors.selectIdentity);
  const didStatus = useSelector(ducks.identity.selectors.getDIDStatus);
	
  const did = identity.did;
	const handleCopy = () => {
		Clipboard.setString(did);
		dispatch(ducks.app.actions.setSnackMessage('DID Copied'));
  };
  
  const handleAssociate = () => {
		navigate(Routes.ASSOCIATE_DID);
  }

  const handleRegister = () => {
		navigate(Routes.REGISTER_DID);
  }

	return (
		<>
			<SectionHeader>
				<Row>
					<Col>
						<SectionTitle>Decentralized ID</SectionTitle>
						<SectionDescription style={{ marginTop: 5 }}>{did ? `${did}` : (didStatus === 'processing' ? 'Processing' : 'No DID')}</SectionDescription>
					</Col>
				</Row>
			</SectionHeader>
			{did ? (
				<Grid style={{ margin: 20 }}>
					<Row>
						<Col marginTop={10}>
							<Button
								type="shell-primary"
								icon={<SKIcon name="icon-copy" size={24} color="#00C0D9" />}
								onPress={handleCopy}
							>
								Copy DID Number
							</Button>
						</Col>
					</Row>
				</Grid>
			) : (
				didStatus === 'processing' ?
				<EmptyItemsConatiner>
					<DocumentsEmptyAlert
						title="Transaction Pending"
						icon="icon-hourglass-large"
					>
						Your transaction is pending. The time it takes to complete will depend on the amount of network traffic.
					</DocumentsEmptyAlert>
				</EmptyItemsConatiner>
				: (
					<EmptyItemsConatiner>
						<DocumentsEmptyAlert
							title="You don't have an associatet DID yet"
							footer={
								<Row marginTop={30}>
									<Col>
										<Button onPress={handleRegister}>Get DID</Button>
									</Col>
									<Col>
										<Button type="shell-primary" onPress={handleAssociate}>I have one</Button>
									</Col>
								</Row>
							}
						>
							Use a DID when accesing different services in the marketplace. Getting a DID requires an
							Ethereum transaction. This is a one time only transaction.
						</DocumentsEmptyAlert>
					</EmptyItemsConatiner>
				)
			)}
		</>
	);
}
