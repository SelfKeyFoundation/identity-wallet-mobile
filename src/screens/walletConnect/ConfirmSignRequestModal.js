import { Box, Button, Typography } from 'design-system';
import { Theme } from 'design-system/theme';
import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { walletConnectOperations, walletConnectSelectors } from './walletConnectSlice';

const screenHeight = Dimensions.get('screen').height;

export function ConfirmSignRequestModal() {
	const dispatch = useDispatch();
	const confirmSignRequest = useSelector(walletConnectSelectors.getConfirmSignRequest);
	const handleConfirm = () => {
		dispatch(walletConnectOperations.confirmSignRequest());
	};
	const handleReject = () => {
		dispatch(walletConnectOperations.rejectSignRequest());
	};

	return (
		<Modal
			isVisible={!!confirmSignRequest}
			onSwipeComplete={handleReject}
			swipeDirection={['down']}
			onBackdropPress={handleReject}
			style={{ justifyContent: 'flex-end', margin: 0 }}
		>
			<View
				style={{
					backgroundColor: Theme.colors.baseDark,
					height: screenHeight * 0.5,
					width: '100%',
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
				}}
			>
				<Box padding={24} flex={1}>
					<Box flex={1} alignItems="center">
						<Box autoWidth marginBottom={8}>
							<Typography fontSize={24}>Confirm sign Request</Typography>
						</Box>
						{/* <Box autoWidth>
							<Typography fontSize={16}>
								By allowing the connection, the dapp will be able to view your public address.
							</Typography>
						</Box> */}
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
	);
}
