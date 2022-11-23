import React, { useEffect, useState } from 'react';
import WalletConnect from '@walletconnect/client';
import {
	Box,
	Button,
	Divider,
	ScreenContainer,
	ScreenHeader,
	TextInput,
	Typography,
} from 'design-system';
import { navigateBack } from 'core/navigation';
import { Web3Service } from 'blockchain/services/web3-service';
import { getConfigs } from 'configs';
import { useDispatch, useSelector } from 'react-redux';
import { walletConnectOperations, walletConnectSelectors } from './walletConnectSlice';
import styled from 'styled-components/native';

const Body = styled(View)`
	flex: 1;
	padding: 16px;
`;

export function WalletConnectScreen() {
	const dispatch = useDispatch();
	// const [uri, setUri] = useState();
	// const handleTextChange = value => {
	// 	setUri(value);
	// };
	// const handleSubmit = () => {
	// 	dispatch(walletConnectOperations.createConnection(uri));
	// };
	const sessions = useSelector(walletConnectSelectors.getCredentials);

	useEffect(() => {
		dispatch(walletConnectOperations.loadSessions());
	}, []);

	// console.log(sessions);
	return (
		<ScreenContainer>
			<ScreenHeader title="Credentials" onBack={navigateBack} />
			<Body>
				{sessions.map(session => {
					return (
						<Box marginBottom={18}>
							<Box flex={0} marginBottom={6}>
								<Typography>ID: {session.id}</Typography>
								<Typography>Type: {session.type && session.type[0]}</Typography>
							</Box>
							<Divider />
						</Box>
					);
				})}
			</Body>
		</ScreenContainer>
	);
}
