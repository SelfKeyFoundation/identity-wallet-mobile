import React, { useState } from 'react';
import { Box, FormattedNumber, Modal, Typography } from 'design-system';
import { parseIncorporationOptions } from '../incorporations/utils';
import { Theme } from 'design-system/theme';
import { useDispatch, useSelector } from 'react-redux';
import { mkpActions, mkpOperations, mkpSelectors } from '../mkpSlice';
import modules from 'core/modules';

export function PaymentModal(props) {
	const [loading, setLoading] = useState();
	const dispatch = useDispatch();
	const details = useSelector(mkpSelectors.getProductDetails);
	const ethFee = useSelector(mkpSelectors.getProductEthFee);
	const handlePay = async () => {
		setLoading(true);
		await dispatch(mkpOperations.confirmPayment());
		setLoading(false);
	};
	const walletOptions = parseIncorporationOptions(details);
	const handleCancel = () => dispatch(mkpActions.setShowPaymentModal(false));
	const showPaymentModal = useSelector(mkpSelectors.getShowPaymentModal);
	if (!details) {
		return null;
	}

	return (
		<Modal
			visible={showPaymentModal}
			onOk={handlePay}
			onCancel={handleCancel}
			onClose={handleCancel}
			title={`Pay Marketplace Fee`}
			okText="Pay"
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
						<FormattedNumber value={details.price} currency="usd" cleanEmptyDecimals />
					</Typography>
					<Typography fontSize={14} textAlign="right" color={Theme.colors.typography}>
						<FormattedNumber value={details.price} currency="key" convertFromUsd />
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
							convertFromToken="eth"
							decimal={3}
							cleanEmptyDecimals
						/>
					</Typography>
					<Typography fontSize={14} textAlign="right" color={Theme.colors.typography}>
						<FormattedNumber value={ethFee} currency="eth" decimal={8} />
					</Typography>
				</Box>
			</Box>
		</Modal>
	);
}
