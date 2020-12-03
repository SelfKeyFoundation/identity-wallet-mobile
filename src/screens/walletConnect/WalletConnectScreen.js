import React, { useState } from 'react';
import WalletConnect from '@walletconnect/client';
import { Box, Button, ScreenContainer, ScreenHeader, TextInput } from 'design-system';
import { navigateBack } from 'core/navigation';
import { Web3Service } from 'blockchain/services/web3-service';
import { getConfigs } from 'configs';
import { useDispatch } from 'react-redux';
import { walletConnectOperations } from './walletConnectSlice';

export function WalletConnectScreen() {
	const dispatch = useDispatch();
	const [uri, setUri] = useState();
	const handleTextChange = value => {
		setUri(value);
	};
	const handleSubmit = () => {
		dispatch(walletConnectOperations.createConnection(uri));
	};

	return (
		<ScreenContainer>
			<ScreenHeader title="Wallet Connect" onBack={navigateBack} />
			<Box row>
				<Box col>
					<TextInput label="URI" onChangeText={handleTextChange} value={uri} />
				</Box>
			</Box>
			<Box row>
				<Box col>
					<Button onPress={handleSubmit}>Submit</Button>
				</Box>
			</Box>
		</ScreenContainer>
	);
}
