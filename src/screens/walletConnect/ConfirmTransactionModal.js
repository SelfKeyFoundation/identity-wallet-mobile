import EthUnits from 'blockchain/util/eth-units';
import EthUtils from 'blockchain/util/eth-utils';
import { Box, Button, SKIcon, Typography } from 'design-system';
import { Theme } from 'design-system/theme';
import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { SelectBox } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { walletConnectOperations, walletConnectSelectors } from './walletConnectSlice';
import { NetworkStore } from 'core/modules/app/NetworkStore';

const screenHeight = Dimensions.get('screen').height;

const APPROVE_FUNCTION_SIGNATURE = '0x095ea7b3';



// const credentials = [{
// 	"credentialSubject": {
// 			"firstName": "Test",
// 			"lastName": "TEST",
// 			"nationality": "Afghanistan",
// 			"dateOfBirth": "2004-04-19",
// 			"id": "did:ethr:0xb6b7848286c0be7d5473620bbb3c3f12ea2ac11b"
// 	},
// 	"issuer": { "id": "did:web:issuer.selfkey.org" },
// 	"type": ["VerifiableCredential"],
// 	"@context": ["https://www.w3.org/2018/credentials/v1"],
// 	"issuanceDate": "2021-04-22T10:30:15.000Z",
// 	"proof": {
// 			"type": "JwtProof2020",
// 			"jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJURVNUIiwibmF0aW9uYWxpdHkiOiJBZmdoYW5pc3RhbiIsImRhdGVPZkJpcnRoIjoiMjAwNC0wNC0xOSJ9LCJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl19LCJzdWIiOiJkaWQ6ZXRocjoweGI2Yjc4NDgyODZjMGJlN2Q1NDczNjIwYmJiM2MzZjEyZWEyYWMxMWIiLCJuYmYiOjE2MTkwODc0MTUsImlzcyI6ImRpZDp3ZWI6aXNzdWVyLnNlbGZrZXkub3JnIn0.M14ZC3Ly3x7gdc75PjAB_NbrlotIDcHFiytATGC7Vi6yjNwuiAQhkz6XzzEU532m5a1CP_jLksrGSdxNQFUz6w"
// 	}
// }];

function PresentationExchange(props) {
	const dispatch = useDispatch();
	const [value, setValue] = useState('invalid');
	const confirmTransaction = useSelector(walletConnectSelectors.getConfirmTransaction);
	const credentials = useSelector(walletConnectSelectors.getCredentials);

	const handleConfirm = () => {
		dispatch(walletConnectOperations.confirmTransaction({
			method: 'presentation_exchange',
			params: [
				credentials.find(item => item.id === value)
			],
		}));
	};
	const handleReject = () => {
		dispatch(walletConnectOperations.rejectTransaction());
	};

	return (
		<Modal
			isVisible={!!confirmTransaction}
			onSwipeComplete={handleReject}
			swipeDirection={['down']}
			onBackdropPress={handleReject}
			style={{ justifyContent: 'flex-end', margin: 0 }}
		>
			<View
				style={{
					backgroundColor: Theme.colors.baseDark,
					height: screenHeight * 0.8,
					
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
				}}
			>
				<Box padding={24} flex={1}>
					<Box flex={1} alignItems="center">
						<Box autoWidth marginBottom={8}>
							<Typography fontSize={24}>Select a credential</Typography>
						</Box>
						<Box marginBottom={8} alignItems="flex-start">
							<Typography fontSize={15}>Please select a credential of type {confirmTransaction.type}</Typography>
						</Box>
						<Box marginTop={16}>
							<SelectBox
								label="Credential"
								selectedValue={value}
								placeholder="Select a credential"
								items={credentials.map((c) => ({
									label: `${c.type[0]}: ${c.id}`,
									value: c.id,
								}))}
								disabled={false}
								onValueChange={(v) => {
									setValue(v)
								}}
							/>
						</Box>
					</Box>
					
					<Box row autoWidth>
						<Box col>
							<Button type="shell-primary" onPress={handleReject}>
								Reject
							</Button>
						</Box>
						<Box col>
							<Button onPress={handleConfirm}>Confirm</Button>
						</Box>
					</Box>
				</Box>
			</View>
		</Modal>
	)
}
function renderTransaction(confirmTransaction) {
	if (!confirmTransaction) {
		return null;
	}

	const fee = EthUnits.unitToUnit(
		+confirmTransaction.gas * +confirmTransaction.gasPrice,
		'wei',
		'ether',
	);

	const amount = confirmTransaction.value && EthUnits.unitToUnit(+confirmTransaction.value, 'wei', 'ether');

	// confirmTransaction.status = 'error';

	if (confirmTransaction.status === 'pending') {
		return (
			<Box autoWidth alignItems="flex-start" width="100%">
				<Box alignItems="center" justifyContent="center" width="100%" marginTop={20}>
					<SKIcon name="icon-hourglass-large" size={66} color="#93B0C1" />
					<Typography fontSize={18} marginTop={20}>
						Transaction Pending
					</Typography>
				</Box>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Amount
				</Typography>
				<Typography fontSize={16}>{amount} ETH</Typography>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Recipient Address
				</Typography>
				<Typography fontSize={16}>{confirmTransaction.to}</Typography>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Transaction Fee
				</Typography>
				<Typography fontSize={16}>{fee} ETH</Typography>
				<Box width="100%" marginTop={20}>
					<Button
						onPress={() => {
							Linking.openURL(EthUtils.getTxReceiptUrl(confirmTransaction.hash));
						}}
					>
						View on {NetworkStore.getNetwork().blockExplorerName}
					</Button>
				</Box>
			</Box>
		);
	}

	if (confirmTransaction.status === 'success') {
		return (
			<Box autoWidth alignItems="flex-start" width="100%">
				<Box alignItems="center" justifyContent="center" width="100%" marginTop={20}>
					<SKIcon name="icon-big-ok" size={66} color="#0ABBD0" />
					<Typography fontSize={18} marginTop={20}>
						Sent
					</Typography>
				</Box>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Amount
				</Typography>
				<Typography fontSize={16}>{amount} ETH</Typography>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Recipient Address
				</Typography>
				<Typography fontSize={16}>{confirmTransaction.to}</Typography>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Transaction Fee
				</Typography>
				<Typography fontSize={16}>{fee} ETH</Typography>
				<Box width="100%" marginTop={20}>
					<Button
						onPress={() => {
							Linking.openURL(EthUtils.getTxReceiptUrl(confirmTransaction.hash));
						}}
					>
						View on {NetworkStore.getNetwork().blockExplorerName}
					</Button>
				</Box>
			</Box>
		);
	}

	if (confirmTransaction.status === 'error') {
		return (
			<Box autoWidth alignItems="flex-start" width="100%">
				<Box alignItems="center" justifyContent="center" width="100%" marginTop={20}>
					<SKIcon name="icon-warning-large" size={66} color="#DB7400" />
					<Typography fontSize={18} marginTop={20}>
						Transaction Failed
					</Typography>
					<Typography fontSize={16} marginTop={20} color={Theme.colors.error}>
						{confirmTransaction.message}
					</Typography>
				</Box>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Amount
				</Typography>
				<Typography fontSize={16}>{amount} ETH</Typography>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Recipient Address
				</Typography>
				<Typography fontSize={16}>{confirmTransaction.to}</Typography>
				<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
					Transaction Fee
				</Typography>
				<Typography fontSize={16}>{fee} ETH</Typography>
				{confirmTransaction.hash ? (
					<Box width="100%" marginTop={20}>
						<Button
							onPress={() => {
								Linking.openURL(EthUtils.getTxReceiptUrl(confirmTransaction.hash));
							}}
						>
							View on {NetworkStore.getNetwork().blockExplorerName}
						</Button>
					</Box>
				) : null}
			</Box>
		);
	}

	const isAllowanceRequest =
		confirmTransaction.data && confirmTransaction.data.indexOf(APPROVE_FUNCTION_SIGNATURE) === 0;

	return (
		<Box autoWidth alignItems="flex-start" width="100%">
			{isAllowanceRequest ? (
				<Typography fontSize={20} marginTop={16} fontWeight="bold">
					Allow the Dapp to spend your tokens?
				</Typography>
			) : null}
			{amount ? (
				<>
					<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
						Amount
					</Typography>
					<Typography fontSize={16}>{amount} ETH</Typography>
				</>
			) : null}
			<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
				Recipient Address
			</Typography>
			<Typography fontSize={16}>{confirmTransaction.to}</Typography>
			<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
				Transaction Fee
			</Typography>
			<Typography fontSize={16}>{fee} ETH</Typography>
			<Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
				Data
			</Typography>
			<Typography fontSize={16}>{confirmTransaction.data && confirmTransaction.data.substring(0, 100)}...</Typography>
		</Box>
	);
}

export function ConfirmTransactionModal() {
	const dispatch = useDispatch();
	const confirmTransaction = useSelector(walletConnectSelectors.getConfirmTransaction);
	const handleConfirm = () => {
		dispatch(walletConnectOperations.confirmTransaction());
	};
	const handleReject = () => {
		dispatch(walletConnectOperations.rejectTransaction());
	};

	const status = confirmTransaction && confirmTransaction.status;
	const method = confirmTransaction && confirmTransaction.method;

	if (method === 'presentation_exchange') {
		return (
			<PresentationExchange />
		)
	}

	return (
		<Modal
			isVisible={!!confirmTransaction}
			onSwipeComplete={handleReject}
			swipeDirection={['down']}
			onBackdropPress={handleReject}
			style={{ justifyContent: 'flex-end', margin: 0 }}
		>
			<View
				style={{
					backgroundColor: Theme.colors.baseDark,
					height: screenHeight * 0.8,
					width: '100%',
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
				}}
			>
				<Box padding={24} flex={1}>
					<Box flex={1} alignItems="center">
						<Box autoWidth marginBottom={8}>
							<Typography fontSize={24}>Transaction Request</Typography>
						</Box>
						{renderTransaction(confirmTransaction)}
					</Box>
					{status === 'pending' || status === 'success' || status === 'error' ? null : (
						<Box row autoWidth>
							<Box col>
								<Button type="shell-primary" onPress={handleReject}>
									Reject
								</Button>
							</Box>
							<Box col>
								<Button onPress={handleConfirm}>Approve</Button>
							</Box>
						</Box>
					)}
				</Box>
			</View>
		</Modal>
	);
}