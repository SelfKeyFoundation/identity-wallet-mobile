import ducks from 'core/modules';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetLockScreen } from './GetLockScreen';

export default function GetLockScreenContainer(props) {
  const dispatch = useDispatch();
	// const vendorId = props.navigation.getParam('vendorId');
  const templateId = '5ec7a38d11c98e95432f7dd3';// props.navigation.getParam('templateId');
  const requirements = useSelector(ducks.kyc.selectors.selectRequirementsForTemplate('selfkey', templateId));
  // const [requirements, setRequirements] = useState();

  useEffect(() => {
    // dispatch(ducks.kyc.operations.loadTemplateOperation(templateId));
  }, []);

  console.log(requirements);
  // requirements: kycSelectors.selectRequirementsForTemplate(
	// 	state,
	// 	props.relyingPartyName,
	// 	props.templateId
	// )
  return (
    <GetLockScreen
      requirements={requirements}
    />
  )
}