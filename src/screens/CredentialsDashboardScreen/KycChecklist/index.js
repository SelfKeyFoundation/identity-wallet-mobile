import React, { useEffect, useState } from 'react';
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
// import { WalletTracker } from '../../WalletTracker';
// import { KycRequirementsList } from './KycRequirementsList';
import { KycChecklist } from './KycChecklist';
import { DocumentModal } from '../../MyProfileScreen/DocumentModal';
import { AttributeModal } from '../../MyProfileScreen/AttributeModal';
import modules from 'core/modules';

export default function KycChecklistContainer(props) {
	const profile = useSelector(modules.identity.selectors.selectProfile);
	const [editAttribute, setEditAttribute] = useState();
  const [addAttribute, setAddAttribute] = useState(false);
	const [addDocument, setAddDocument] = useState(false);
  const [editDocument, setEditDocument] = useState();

  // const templateId = '5ec7a38d11c98e95432f7dd3';// props.navigation.getParam('templateId');
  // const requirements = useSelector(ducks.kyc.selectors.selectRequirementsForTemplate(templateId));

	const handleDocumentModalClose = () => {
    setEditDocument(null);
    setAddDocument(false);
  }

	const handleAttributeModalClose = () => {
    setEditAttribute(null);
    setAddAttribute(false);
	}

  const handleAddDocument = (typeId) => {
    setAddDocument(typeId);
	}

	const handleEditDocument = (attrId) => {
		console.log('edit document', attrId);
    setEditDocument(attrId);
	};
	
	const handleAddAttribute = (typeId) => setAddAttribute(typeId);
 
	const handleEditAttribute = (attrId) => {
    setEditAttribute(attrId);
	};

	return (
		<>
			<KycChecklist
				profile={profile}
				requirements={props.requirements || []}
				onEditDocument={handleEditDocument}
				onEditAttribute={handleEditAttribute}
				onAddDocument={handleAddDocument}
				onAddAttribute={handleAddAttribute}
			/>
			{
        editAttribute ? (
          <AttributeModal
            attribute={editAttribute}
            visible={true}
            profile={profile}
            onClose={handleAttributeModalClose}
          />
        ) : null
      }
      {
        addAttribute ? (
          <AttributeModal
            visible={true}
            profile={profile}
            type={addAttribute}
            onClose={handleAttributeModalClose}
          />
        ) : null
      }
			{
        editDocument ? (
          <DocumentModal
            attribute={editDocument}
            visible={true}
            profile={profile}
            onClose={handleDocumentModalClose}
          />
        ) : null
      }
      {
        addDocument ? (
          <DocumentModal
            visible={true}
            profile={profile}
            type={addDocument}
            onClose={handleDocumentModalClose}
          />
        ) : null
      }
		</>
	);
}
