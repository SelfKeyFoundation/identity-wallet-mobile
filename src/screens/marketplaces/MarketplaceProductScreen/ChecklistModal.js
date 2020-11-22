import React, { useState } from 'react';
import { Box, FormattedNumber, Modal, Typography } from 'design-system';
import { parseIncorporationOptions } from '../incorporations/utils';
import { Theme } from 'design-system/theme';
import { useDispatch, useSelector } from 'react-redux';
import { mkpActions, mkpOperations, mkpSelectors, ProductDetailSelectors } from '../mkpSlice';
import KycChecklist from './KycChecklist';
import modules from 'core/modules';

export function ChecklistModal(props) {
	const dispatch = useDispatch();
	const details = useSelector(mkpSelectors.getProductDetails);
	const vendorId = details.vendorId;
	const templateId = ProductDetailSelectors.getTemplateId(details);
	const requirements = useSelector(modules.kyc.selectors.selectRequirementsForTemplate(vendorId, templateId));
	const handleCancel = () => dispatch(mkpActions.setShowChecklistModal(false));
	const handleApplicationSuccess = async () => {
		await dispatch(mkpOperations.payApplication(true));
		dispatch(mkpActions.setShowChecklistModal(false));
	}

	return (
		<KycChecklist
			requirements={requirements}
			onCancel={handleCancel}
			onSuccess={handleApplicationSuccess}
			templateId={templateId}
			vendorId={vendorId}
		/>
	);
}
