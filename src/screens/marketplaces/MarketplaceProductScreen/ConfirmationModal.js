import React, { useState } from 'react';
import { Box, FormattedNumber, Modal, Typography } from 'design-system';
import { parseIncorporationOptions } from '../incorporations/utils';
import { Theme } from 'design-system/theme';
import { useDispatch, useSelector } from 'react-redux';
import { mkpActions, mkpOperations, mkpSelectors } from '../mkpSlice';
import { NetworkStore } from 'core/modules/app/NetworkStore';

export function ConfirmationModal(props) {
	const [loading, setLoading] = useState();
	const dispatch = useDispatch();
	const details = useSelector(mkpSelectors.getProductDetails);
	const ethFee = useSelector(mkpSelectors.getProductEthFee);
	const price = useSelector(mkpSelectors.getSelectedPrice);
	const handleStartApplication = async () => {
		setLoading(true);
		setTimeout(async () => {
			await dispatch(mkpOperations.startApplication());
			setLoading(false);
		}, 300)
	};
	const walletOptions = parseIncorporationOptions(details);
	const handleCancel = () => dispatch(mkpActions.setShowConfirmationModal(false));
	const showConfirmationModal = useSelector(mkpSelectors.getShowConfirmationModal);

	if (!details) {
		return null;
	}

	return (
		<Modal
			visible={showConfirmationModal}
			onOk={handleStartApplication}
			onCancel={handleCancel}
			onClose={handleCancel}
			title={`Pay Marketplace Fee`}
			okText="Start Application"
			okProps={{
				isLoading: loading,
			}}
			cancelText="Cancel"
		>
			{walletOptions.length ? (
				<>
					<Box marginBottom={15}>
						<Typography fontWeight="bold">Service Costs</Typography>
					</Box>
					<Box>
						{walletOptions.map(option => (
							<Box row>
								<Box col>
									<Typography>{option.description}</Typography>
								</Box>
								<Box col autoWidth>
									<Typography
										textAlign="right"
										fontSize={18}
										color={Theme.colors.primary}
										fontWeight="bold"
									>
										<FormattedNumber value={option.price} currency="usd" cleanEmptyDecimals />
									</Typography>
								</Box>
							</Box>
						))}
					</Box>
					<Box height={1} backgroundColor={Theme.colors.typography} marginTop={25} marginBottom={25} />
				</>
			) : null}
			<Box row>
				<Box col>
					<Typography fontWeight="bold">Cost</Typography>
				</Box>
				<Box col autoWidth>
					<Typography
						fontSize={18}
						color={Theme.colors.primary}
						textAlign="right"
						fontWeight="bold"
					>
						<FormattedNumber value={price.amount} currency="usd" cleanEmptyDecimals />
					</Typography>
					<Typography fontSize={14} textAlign="right" color={Theme.colors.typography}>
						<FormattedNumber value={price.amount} currency={price.cryptoCurrency} convertFromUsd />
					</Typography>
				</Box>
			</Box>
			<Box row>
				<Box col>
					<Typography color={Theme.colors.typography}>Network Transaction Fee</Typography>
				</Box>
				<Box col autoWidth>
					<Typography
						fontSize={18}
						color={Theme.colors.primary}
						textAlign="right"
						fontWeight="bold"
					>
						<FormattedNumber
							value={ethFee}
							currency="usd"
							convertFromToken={NetworkStore.getNetwork().symbol}
							decimal={3}
							cleanEmptyDecimals
						/>
					</Typography>
					<Typography fontSize={14} textAlign="right" color={Theme.colors.typography}>
						<FormattedNumber value={ethFee} currency={NetworkStore.getNetwork().symbol} decimal={8} />
					</Typography>
				</Box>
			</Box>
		</Modal>
	);
}
