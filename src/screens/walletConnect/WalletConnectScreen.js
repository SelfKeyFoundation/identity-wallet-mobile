import React, { useEffect, useState } from 'react';
import WalletConnect from '@walletconnect/client';
import { Box, Button, ScreenContainer, ScreenHeader, TextInput, Typography } from 'design-system';
import { navigateBack } from 'core/navigation';
import { Web3Service } from 'blockchain/services/web3-service';
import { getConfigs } from 'configs';
import { useDispatch, useSelector } from 'react-redux';
import { walletConnectOperations, walletConnectSelectors } from './walletConnectSlice';
import styled from 'styled-components/native';

const Body = styled.View`
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
	const sessions = useSelector(walletConnectSelectors.getSessions);

	useEffect(() => {
		dispatch(walletConnectOperations.loadSessions());
	}, []);
	
	console.log(sessions);
	return (
		<ScreenContainer>
			<ScreenHeader title="Wallet Connect Sessions" onBack={navigateBack} />
			<Body>
				{
					sessions.map((session) => {
						return (
							<Box row>
								<Box col>
									<Typography>{session.peerMeta && session.peerMeta.name}</Typography>
									<Typography>{session.peerMeta && session.peerMeta.url}</Typography>
									<Box marginTop={8}>
										<Button onPress={() => {
											dispatch(walletConnectOperations.disconnectSession(session))
										}}>Disconnect</Button>
									</Box>
								</Box>
							</Box>
						)
					})
				}
			</Body>
		</ScreenContainer>
	);
}
