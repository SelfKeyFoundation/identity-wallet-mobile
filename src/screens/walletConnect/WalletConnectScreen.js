import React, { useState } from 'react';
import WalletConnect from '@walletconnect/client';
import { Box, Button, ScreenContainer, ScreenHeader, TextInput } from 'design-system';
import { navigateBack } from 'core/navigation';
import { Web3Service } from 'blockchain/services/web3-service';
import { getConfigs } from 'configs';
import { useDispatch } from 'react-redux';
import { walletConnectOperations } from './walletConnectSlice';

async function handleConnection(uri) {
	// Create connector
	const connector = new WalletConnect(
		{
			// Required
			uri,
			// // Required
			// clientMeta: {
			// 	description: 'WalletConnect Developer App',
			// 	url: 'https://walletconnect.org',
			// 	icons: ['https://walletconnect.org/walletconnect-logo.png'],
			// 	name: 'WalletConnect',
			// },
		},
		// {
		// 	// Optional
		// 	url: 'https://push.walletconnect.org',
		// 	type: 'fcm',
		// 	token: '123123123sdfasdfasdf',
		// 	peerMeta: true,
		// 	// language: language,
		// },
  );
  
  await connector.createSession();

	// Subscribe to session requests
	connector.on('session_request', (error, payload) => {
    if (error) {
			throw error;
    }
    
    const address = Web3Service.getInstance().web3.eth.defaultAccount;

    connector.approveSession({
      accounts: [
        address
      ],
      chainId: getConfigs().chainId,
    });

		// Handle Session Request

		/* payload:
  {
    id: 1,
    jsonrpc: '2.0'.
    method: 'session_request',
    params: [{
      peerId: '15d8b6a3-15bd-493e-9358-111e3a4e6ee4',
      peerMeta: {
        name: "WalletConnect Example",
        description: "Try out WalletConnect v1.x.x",
        icons: ["https://example.walletconnect.org/favicon.ico"],
        url: "https://example.walletconnect.org"
      }
    }]
  }
  */
	});

	// Subscribe to call requests
	connector.on('call_request', (error, payload) => {
    debugger;

		if (error) {
			throw error;
    }
    
    

		// Handle Call Request

		/* payload:
  {
    id: 1,
    jsonrpc: '2.0'.
    method: 'eth_sign',
    params: [
      "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
      "My email is john@doe.com - 1537836206101"
    ]
  }
  */
	});

	connector.on('disconnect', (error, payload) => {
    debugger;

		if (error) {
			throw error;
		}

		// Delete connector
	});
}

export function WalletConnectScreen() {
	const dispatch = useDispatch();
	const [uri, setUri] = useState();
	const handleTextChange = value => {
		setUri(value);
	};
	const handleSubmit = () => {
		// handleConnection(uri);
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
