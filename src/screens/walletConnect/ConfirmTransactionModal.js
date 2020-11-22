import { Box, Button, Typography } from 'design-system';
import { Theme } from 'design-system/theme';
import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { walletConnectOperations, walletConnectSelectors } from './walletConnectSlice';

const screenHeight = Dimensions.get('screen').height;

function renderTransaction(confirmTransaction) {
  if (!confirmTransaction) {
    return null;
  }

  return (
    <Box autoWidth alignItems="flex-start" width="100%">
      <Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
        Amount
      </Typography>
      <Typography fontSize={16}>{confirmTransaction.amount} ETH</Typography>
      <Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
        Recipient Address
      </Typography>
      <Typography fontSize={16}>{confirmTransaction.address}</Typography>
      <Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
        Transaction Fee
      </Typography>
      <Typography fontSize={16}>{confirmTransaction.fee} ETH</Typography>
      <Typography fontSize={16} marginTop={16} color={Theme.colors.typography}>
        Data
      </Typography>
      <Typography fontSize={16}>{confirmTransaction.data}</Typography>
    </Box>
  )
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
						{
              renderTransaction(confirmTransaction)
            }
					</Box>
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
				</Box>
			</View>
		</Modal>
	);
}
