import ducks from 'core/modules';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StakingDashboard } from './StakingDashboard';
import { StakingSetup } from './StakingSetup';

export default function GetLockScreenContainer(props) {
  const dispatch = useDispatch();
  const stakeInfo = useSelector(ducks.staking.selectors.selectStakingInfo);
	// const vendorId = props.navigation.getParam('vendorId');
  // const templateId = '5ec7a38d11c98e95432f7dd3';// props.navigation.getParam('templateId');
  // const requirements = useSelector(ducks.kyc.selectors.selectRequirementsForTemplate('selfkey', templateId));
  // const [requirements, setRequirements] = useState();

  useEffect(() => {
    dispatch(ducks.staking.operations.fetchStakeOperation());
  }, []);

  console.log('#stake info', stakeInfo);

  if (!stakeInfo.initialized) {
    return null;
  }
  
  if (!stakeInfo.hasStaked) {
    return <StakingSetup />
  }
  // console.log(requirements);
  // requirements: kycSelectors.selectRequirementsForTemplate(
	// 	state,
	// 	props.relyingPartyName,
	// 	props.templateId
	// )
  return (
    <StakingDashboard />
  )
}