
import types from './types';

export const identityActions = {
  setRepositories: repos => ({
    type: types.IDENTITY_REPOSITORIES_SET,
    payload: repos
  }),
  setIdAttributeTypes: attributeTypes => ({
		type: types.IDENTITY_ID_ATTRIBUTE_TYPES_SET,
		payload: attributeTypes
	}),
	setUISchemas: uiSchemas => ({
		type: types.IDENTITY_UI_SCHEMAS_SET,
		payload: uiSchemas
	}),
	setDIDStatus: status => ({
		type: types.SET_DID_STATUS,
		payload: { status }
	}),
  // setDocuments: (identityId, documents) => ({
	// 	type: types.IDENTITY_DOCUMENTS_SET,
	// 	payload: {
	// 		identityId,
	// 		documents
	// 	}
	// }),
	// deleteDocuments: identityId => ({
	// 	type: types.IDENTITY_DOCUMENTS_DELETE,
	// 	payload: identityId
	// }),
	setIdAttributes: (identityId, attributes) => ({
		type: types.IDENTITY_ATTRIBUTES_SET,
		payload: {
			identityId,
			attributes
		}
	}),
	deleteIdAttributes: identityId => ({
		type: types.IDENTITY_ATTRIBUTES_DELETE,
		payload: identityId
	}),
	deleteIdAttribute: attributeId => ({
		type: types.IDENTITY_ATTRIBUTE_DELETE,
		payload: attributeId
	}),
	addIdAttribute: attribute => ({
		type: types.IDENTITY_ATTRIBUTE_ADD,
		payload: attribute
	}),
	// setDocumentsForAttribute: (attributeId, documents) => ({
	// 	type: types.IDENTITY_ATTRIBUTE_DOCUMENTS_SET,
	// 	payload: { attributeId, documents }
	// }),
	// deleteDocumentsForAttribute: attributeId => ({
	// 	type: types.IDENTITY_ATTRIBUTE_DOCUMENTS_DELETE,
	// 	payload: attributeId
	// }),
	// addDocument: attribute => ({
	// 	type: types.IDENTITY_DOCUMENT_ADD,
	// 	payload: attribute
	// }),
	// updateDocument: attribute => ({
	// 	type: types.IDENTITY_DOCUMENT_UPDATE,
	// 	payload: attribute
	// }),
	updateIdAttribute: attribute => ({
		type: types.IDENTITY_ATTRIBUTE_UPDATE,
		payload: attribute
	}),
	// deleteDocument: documentId => ({
	// 	type: types.IDENTITY_DOCUMENT_DELETE,
	// 	payload: documentId
	// }),
	setIdentities: identities => ({
		type: types.IDENTITIES_SET,
		payload: identities
	}),
	addIdentity: identity => ({
		type: types.IDENTITY_ADD,
		payload: identity
	}),
	updateIdentity: identity => ({
		type: types.IDENTITY_UPDATE,
		payload: identity
	}),
	setCurrentIdentity: identityId => ({
		type: types.IDENTITY_CURRENT_SET,
		payload: identityId
	})
};

export default identityActions;
