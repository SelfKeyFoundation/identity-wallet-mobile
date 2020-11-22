import React from 'react';
// import { MarketplaceProductDetails, ProductOverview, ProductRequirements } from '../components';
import { Box, FormattedNumber, Typography } from 'design-system';
// import { Flag } from 'react-native-svg-flagkit';
// import HTMLView from 'react-native-htmlview';
// import HTML from 'react-native-render-html';
// import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
// import { parseIncorporationOptions } from '../incorporations/utils';
import { Theme } from 'design-system/theme';
import { useDispatch, useSelector } from 'react-redux';
import { mkpActions, mkpSelectors } from '../mkpSlice';
import { ReceiveTokens } from 'components';
import modules from 'core/modules';
import { Clipboard, Share } from 'react-native';

export function BalanceErrorModal(props) {
	const { details } = props;
	const showBalanceErrorModal = useSelector(mkpSelectors.getShowBalanceErrorModal);
	const dispatch = useDispatch();
	const errorDetails = useSelector(mkpSelectors.getErrorDetails);
	const handleCancel = () => dispatch(mkpActions.setShowBalanceErrorModal(false));
	const address = useSelector(modules.wallet.selectors.getAddress);

	const handleShare = () => {
		Share.share({
      message: address,
    });
	}

	const handleCopy = () => {
		Clipboard.setString(address);
	}

	return (
		<ReceiveTokens
			visible={showBalanceErrorModal}
			onOk={handleCancel}
			onCancel={handleCancel}
			onClose={handleCancel}
			title={`Transaction Confirmation`}
			okText="Ok"
			okProps={{
				isLoading: false,
			}}
			cancelText="Cancel"
			tokenAddress={address}
			tokenSymbol="KEY"
			onCopy={handleCopy}
			onShare={handleShare}
		>
			<Box>
				<Box marginTop={16}>
					<Typography fontWeight="bold" color={Theme.colors.error}>
						You do not have enough KEY tokens to pay for this marketplace application.
					</Typography>
				</Box>
				<Box marginTop={16}>
					<Typography>
						To access this marketplace, you will need to deposit{' '}
						<FormattedNumber value={errorDetails.remainingKey} currency="key" /> tokens in your
						SelfKey Wallet.
					</Typography>
				</Box>
			</Box>
		</ReceiveTokens>
	);
}
