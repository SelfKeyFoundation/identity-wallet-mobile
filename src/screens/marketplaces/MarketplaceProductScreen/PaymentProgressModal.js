import React, { useState } from 'react';
import { Box, FormattedNumber, Modal, Typography } from 'design-system';
import { parseIncorporationOptions } from '../incorporations/utils';
import { Theme } from 'design-system/theme';
import { useDispatch, useSelector } from 'react-redux';
import { mkpActions, mkpOperations, mkpSelectors } from '../mkpSlice';
import modules from 'core/modules';
import { PendingStep } from 'screens/SendTokensScreen/PendingStep';
import { SuccessStep } from 'screens/SendTokensScreen/SuccessStep';
import { ErrorStep } from 'screens/SendTokensScreen/ErrorStep';

export function PaymentProgressModal(props) {
	const dispatch = useDispatch();
  const details = useSelector(mkpSelectors.getProductDetails);
	// const ethFee = useSelector(mkpSelectors.getProductEthFee);
	// const handlePay = async () => {
	// 	setLoading(true);
	// 	await dispatch(mkpOperations.confirmPayment());
	// 	setLoading(false);
	// };
	// const walletOptions = parseIncorporationOptions(details);
	const handleCancel = () => dispatch(mkpActions.setShowPaymentProgressModal(false));
  const showPaymentProgressModal = useSelector(mkpSelectors.getShowPaymentProgressModal);
  const status = useSelector(modules.transaction.selectors.getStatus);

  if (!details) {
    return null;
	}
	
	let content;
	
	let Renderer = () => null;

  switch(status) {
    case 'pending': {
      Renderer = PendingStep;
      break;
    }
    case 'sent': {
      Renderer = SuccessStep;
      break;
    }
    case 'error': {
      Renderer = ErrorStep;
      break;
    }
  }
	// if () {
	// 	 content = <PendingStep />
	// } else {
	// 	content = (
	// 		<Box marginBottom={15}>
	// 			<Typography fontWeight="bold">Payment in progress</Typography>
	// 		</Box>
	// 	)
	// }

	return (
		<Modal
			visible={showPaymentProgressModal}
			onClose={handleCancel}
			onCancel={handleCancel}
			title={'Application Payment'}
			footer={null}
		>
			<Renderer />
		</Modal>
	);
}
