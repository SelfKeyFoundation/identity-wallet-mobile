import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateBack } from 'core/navigation';
import ducks from 'core/modules';
import styled from 'styled-components/native';
import {
	Grid,
	Row,
	Col,
	ScreenContainer,
	Paragraph,
} from 'design-system';
import { WalletTracker } from '../../WalletTracker';
import { KycRequirementsList } from './KycRequirementsList';
import KycChecklist from './KycChecklist';

export function GetLockScreen(props) {
	const dispatch = useDispatch();
	const { requirements } = props;

	// rp: kycSelectors.relyingPartySelector(state, vendorId),
	// rpShouldUpdate: kycSelectors.relyingPartyShouldUpdateSelector(
	//  state,
	//  vendorId,
	//  authenticated
	//)

	useEffect(() => {
		dispatch(ducks.kyc.operations.loadRelyingPartyOperation('selfkey'))
	}, []);

	const handleStartApplication = () => {
		// dispatch(
		//   kycOperations.startCurrentApplicationOperation(
		//     vendorId,
		//     templateId,
		//     this.payRoute(),
		//     this.cancelRoute(),
		//     `Incorporate in ${region}`,
		//     `You are about to begin the incorporation process in ${region}. Please double check your
		//     required documents are Certified True or Notarized where necessary. Failure to do so
		//     will result in delays in the incorporation process. You may also be asked to provide
		//     more information by the service provider`,
		//     'conducting KYC',
		//     vendor.name,
		//     vendor.privacyPolicy,
		//     vendor.termsOfService
		//   )
		// );
	};

	return (
		<ScreenContainer sidePadding>
			<Grid>
				<Row>
					<Col>
						<Paragraph>KYC Test</Paragraph>
					</Col>
				</Row>
			</Grid>
      {/* <KycRequirementsList requirements={requirements} style={{ margin: 20 }}/> */}
      <KycChecklist
        requirements={requirements}
      />
		</ScreenContainer>
	);
}
