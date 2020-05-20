import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyProfile } from './MyProfile';
import ducks from '@selfkey/wallet-core/modules';
import { AttributeModal } from './AttributeModal';
import { EditPictureModal } from './EditPictureModal';
import { FIRST_NAME_ATTRIBUTE } from '@selfkey/wallet-core/modules/identity/constants';

function MyProfileContainer(props) {
  const [editAttribute, setEditAttribute] = useState();
  const [editPicture, setEditPicture] = useState();
  const profile = useSelector(ducks.identity.selectors.selectProfile);

  console.log(profile);

  const handleAttributeEdit = (attrId) => {
    setEditAttribute(attrId);
  };

  const handlePictureEdit = () => {
    setEditPicture(true);  
  }

  const handleEdit = (attrId) => {
    setEditAttribute(attrId);
  };

  const handleAttributeModalClose = () => setEditAttribute(null);
  const handlePictureModalClose = () => setEditPicture(false);

  return (
    <React.Fragment>
      <MyProfile
        profile={profile}
        onAttributeEdit={handleEdit}
        onPictureEdit={handlePictureEdit}
      />
      {
        editAttribute ? (
          <AttributeModal
            attribute={editAttribute}
            visible={true}
            onClose={handleAttributeModalClose}
          />
        ) : null
      }
      {
        editPicture ? (
          <EditPictureModal
            visible={true}
            onClose={handlePictureModalClose}
          />
        ) : null
      }
    </React.Fragment>
  );
}

export default MyProfileContainer;
