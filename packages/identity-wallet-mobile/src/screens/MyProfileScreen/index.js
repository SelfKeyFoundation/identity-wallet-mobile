import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyProfile } from './MyProfile';
import ducks from '@selfkey/wallet-core/modules';
import { containsFile } from '@selfkey/wallet-core/modules/identity/json-schema-utils';
import { AttributeModal } from './AttributeModal';
import { DocumentModal } from './DocumentModal';

import { EditPictureModal } from './EditPictureModal';
import { FIRST_NAME_ATTRIBUTE } from '@selfkey/wallet-core/modules/identity/constants';

function MyProfileContainer(props) {
  const dispatch = useDispatch();
  const [editAttribute, setEditAttribute] = useState();
  const [addAttribute, setAddAttribute] = useState(false);
  const [editDocument, setEditDocument] = useState();
  const [addDocument, setAddDocument] = useState(false);
  const [editPicture, setEditPicture] = useState();
  const profile = useSelector(ducks.identity.selectors.selectProfile);

  const handlePictureEdit = () => {
    setEditPicture(true);  
  }

  const handleDelete = (attrId) => {
    dispatch(ducks.identity.operations.removeIdAttributeOperation(attrId));
  }

  const handleEdit = (attrId) => {
    setEditAttribute(attrId);
  };

  const handleAttributeModalClose = () => {
    setEditAttribute(null);
    setAddAttribute(false);
  }

  const handleDocumentModalClose = () => {
    setEditDocument(null);
    setAddDocument(false);
  }

  const handleAddDocument = () => {
    setAddDocument(true);
  }

  const handleEditDocument = (attrId) => {
    setEditDocument(attrId);
  };

  const handlePictureModalClose = () => setEditPicture(false);
  const handleAdd = () => setAddAttribute(true);
  const {identity = {}} = profile;

  return (
    <React.Fragment>
      <MyProfile
        profile={profile}
        onEditAttribute={handleEdit}
        onEditDocument={handleEditDocument}
        onAddDocument={handleAddDocument}
        onDeleteAttribute={handleDelete}
        onAddAttribute={handleAdd}
        onPictureEdit={handlePictureEdit}
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
            onClose={handleDocumentModalClose}
          />
        ) : null
      }
      {
        editPicture ? (
          <EditPictureModal
            visible={true}
            onClose={handlePictureModalClose}
            identityId={identity.id}
            profilePicture={identity.profilePicture}
          />
        ) : null
      }
    </React.Fragment>
  );
}

export default MyProfileContainer;

