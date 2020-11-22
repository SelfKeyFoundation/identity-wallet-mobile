import React, { useEffect, useState } from 'react';
import { MarketplaceProductDetails, ProductOverview, ProductRequirements } from '../components';
import { Modal, ScreenContainer } from 'design-system';
import { navigateBack } from 'core/navigation';
import { useDispatch, useSelector } from 'react-redux';
import modules from 'core/modules';
import { ActivityIndicator } from 'react-native';
import KycChecklist from './KycChecklist';

export default function MarketplaceProductScreen(props) {
  // fetch requirements
  const dispatch = useDispatch();
  const [showChecklist, setShowChecklist] = useState();
  const templateId = '5ec7a38d11c98e95432f7dd3';// props.navigation.getParam('templateId');
  const requirements = useSelector(modules.kyc.selectors.selectRequirementsForTemplate('selfkey', templateId));
  const handleApply = () => {
    setShowChecklist(true);
  }
  
  const handleCancel = () => {
    setShowChecklist(false);
  }

  useEffect(() => {
		dispatch(modules.kyc.operations.loadRelyingPartyOperation('selfkey'))
  }, []);

  if (!requirements) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="small" color="#00C0D9"/>
      </ScreenContainer>
    )
  }
  
  if (showChecklist) {
    return (
      <KycChecklist
        requirements={requirements}
        onCancel={handleCancel}
      />
    )
  }
  return (
    <ScreenContainer>
      <MarketplaceProductDetails
        title="DeFi Credentials"
        onSignUp={handleApply}
        onBack={navigateBack}
        tabs={[{
            id: 'overview',
            title: 'Overview', 
            component: ProductOverview
          }, {
            id: 'requirements',
            title: 'Requirements', 
            component: () => <ProductRequirements requirements={requirements} />
          }, 
        ]}
      />
    </ScreenContainer>
    
  )
}
