import { createReducer } from '../../redux/reducers';
import types from './types';

export const initialState = {
	repositories: [],
	repositoriesById: {},
	idAtrributeTypes: [],
	idAtrributeTypesById: {},
	uiSchemas: [],
	uiSchemasById: {},
	documents: [],
	documentsById: {},
	attributes: [],
	attributesById: {},
	countries: [],
	identities: [],
	identitiesById: {},
	currentIdentity: null
};

const setRepositoriesReducer = (state, action) => {
	let repositories = action.payload || [];
	let repositoriesById = repositories.reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});
	repositories = repositories.map(repo => repo.id);
	return { ...state, repositories, repositoriesById };
};

const setIdAttributeTypesReducer = (state, action) => {
	let idAtrributeTypes = action.payload || [];
	let idAtrributeTypesById = idAtrributeTypes.reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});
	idAtrributeTypes = idAtrributeTypes.map(attr => attr.id);
	return { ...state, idAtrributeTypes, idAtrributeTypesById };
};

const setUISchemasReducer = (state, action) => {
	let uiSchemas = action.payload || [];
	let uiSchemasById = uiSchemas.reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});
	uiSchemas = uiSchemas.map(attr => attr.id);
	return { ...state, uiSchemas, uiSchemasById };
};

// const setDocumentsReducer = (state, action) => {
// 	let oldDocuments = state.documents
// 		.map(docId => state.documentsById[docId])
// 		.filter(doc => doc.identityId !== action.identityId);
// 	let documents = [...oldDocuments, ...(action.payload.documents || [])];
// 	let documentsById = documents.reduce((acc, curr) => {
// 		acc[curr.id] = curr;
// 		return acc;
// 	}, {});
// 	documents = documents.map(attr => attr.id);
// 	return { ...state, documents, documentsById };
// };

// const setAttributeDocumentsReducer = (state, action) => {
// 	let oldDocuments = state.documents
// 		.map(docId => state.documentsById[docId])
// 		.filter(doc => doc.attributeId !== action.payload.attributeId);
// 	let documents = [...oldDocuments, ...(action.payload.documents || [])];
// 	let documentsById = documents.reduce((acc, curr) => {
// 		acc[curr.id] = curr;
// 		return acc;
// 	}, {});
// 	documents = documents.map(attr => attr.id);
// 	return { ...state, documents, documentsById };
// };

// const deleteAttributeDocumentsReducer = (state, action) => {
// 	let documents = state.documents
// 		.map(docId => state.documentsById[docId])
// 		.filter(doc => doc.attributeId !== action.payload);
// 	let documentsById = documents.reduce((acc, curr) => {
// 		acc[curr.id] = curr;
// 		return acc;
// 	}, {});
// 	documents = documents.map(attr => attr.id);
// 	return { ...state, documents, documentsById };
// };

// const deleteDocumentsReducer = (state, action) => {
// 	let documents = state.documents
// 		.map(docId => state.documentsById[docId])
// 		.filter(doc => doc.identityId !== action.payload);
// 	let documentsById = documents.reduce((acc, curr) => {
// 		acc[curr.id] = curr;
// 		return acc;
// 	}, {});
// 	documents = documents.map(attr => attr.id);
// 	return { ...state, documents, documentsById };
// };

const setIdAttributesReducer = (state, action) => {
	let oldIdAttributes = state.attributes
		.map(attrId => state.attributesById[attrId])
		.filter(attr => attr.identityId !== action.payload.identityId);
	let attributes = [...oldIdAttributes, ...(action.payload.attributes || [])];
	let attributesById = attributes.reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});
	attributes = attributes.map(attr => attr.id);
	return { ...state, attributes, attributesById };
};

const deleteIdAttributesReducer = (state, action) => {
	let attributes = state.attributes
		.map(attrId => state.attributesById[attrId])
		.filter(attr => attr.identityId !== action.payload);
	let attributesById = attributes.reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});
	attributes = attributes.map(attr => attr.id);
	return { ...state, attributes, attributesById };
};

const addIdAttributeReducer = (state, action) => {
	let attributes = [...state.attributes, action.payload.id];
	let attributesById = { ...state.attributesById, [action.payload.id]: action.payload };
	return { ...state, attributes, attributesById };
};

// const addDocumentReducer = (state, action) => {
// 	let documents = [...state.documents, action.payload.id];
// 	let documentsById = { ...state.documentsById, [action.payload.id]: action.payload };
// 	return { ...state, documents, documentsById };
// };

const updateIdAttributeReducer = (state, action) => {
	if (!state.attributes.includes(action.payload.id)) return state;
	let attributesById = {
		...state.attributesById,
		[action.payload.id]: {
			...state.attributesById[action.payload.id],
			...action.payload
		}
	};
	return { ...state, attributesById };
};

// const updateDocumentReducer = (state, action) => {
// 	if (!state.documents.includes(action.payload.id)) return state;
// 	let documentsById = {
// 		...state.documentsById,
// 		[action.payload.id]: {
// 			...state.documentsById[action.payload.id],
// 			...action.payload
// 		}
// 	};
// 	return { ...state, documentsById };
// };

// const deleteDocumentReducer = (state, action) => {
// 	if (!state.documents.includes(action.payload)) return state;
// 	let documents = state.documents.filter(id => id !== action.payload);
// 	let documentsById = { ...state.documentsById };
// 	delete documentsById[action.payload];
// 	return { ...state, documentsById, documents };
// };

const deleteIdAttributeReducer = (state, action) => {
	if (!state.attributes.includes(action.payload)) return state;
	let attributes = state.attributes.filter(id => id !== action.payload);
	let attributesById = { ...state.attributesById };
	delete attributesById[action.payload];
	return { ...state, attributesById, attributes };
};

const setIdentitiesReducer = (state, action) => {
	const identities = (action.payload || []).map(idnt => idnt.id);
	const identitiesById = (action.payload || []).reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});

	return { ...state, identities, identitiesById };
};

const addIdentityReducer = (state, action) => {
	const { identities, identitiesById } = state;

	if (identities.includes(action.payload.id)) {
		return state;
	}

	identities.push(action.payload.id);
	identitiesById[action.payload.id] = action.payload;

	return { ...state, identities, identitiesById };
};

const updateIdentityReducer = (state, action) => {
	const { identities, identitiesById } = state;

	if (!identities.includes(action.payload.id)) {
		return state;
	}

	identitiesById[action.payload.id] = { ...identitiesById[action.payload.id], ...action.payload };

	return { ...state, identities, identitiesById };
};

const setCurrentIdentityReducer = (state, action) => {
	return { ...state, currentIdentity: action.payload };
};

export const identityReducers = {
  setRepositoriesReducer,
  setIdAttributeTypesReducer,
	setUISchemasReducer,
	// setDocumentsReducer,
	// deleteDocumentsReducer,
	setIdAttributesReducer,
	deleteIdAttributesReducer,
	// setAttributeDocumentsReducer,
	// deleteAttributeDocumentsReducer,
	addIdAttributeReducer,
	// addDocumentReducer,
	updateIdAttributeReducer,
	// updateDocumentReducer,
	// deleteDocumentReducer,
	deleteIdAttributeReducer,
	setIdentitiesReducer,
	addIdentityReducer,
	updateIdentityReducer,
	setCurrentIdentityReducer,
};

const reducersMap = {
  [types.IDENTITY_REPOSITORIES_SET]: identityReducers.setRepositoriesReducer,
  [types.IDENTITY_ID_ATTRIBUTE_TYPES_SET]: identityReducers.setIdAttributeTypesReducer,
	[types.IDENTITY_UI_SCHEMAS_SET]: identityReducers.setUISchemasReducer,
	[types.IDENTITY_COUNTRIES_SET]: identityReducers.setCountries,
	// [types.]: identityReducers.setRepositoriesReducer,
	// [types.]: identityReducers.setIdAttributeTypesReducer,
	// [types.]: identityReducers.setUiSchemasReducer,
	// [types.]: identityReducers.setDocumentsReducer,
	// [types.]: identityReducers.deleteDocumentsReducer,
	[types.IDENTITY_ATTRIBUTES_SET]: identityReducers.setIdAttributesReducer,
	[types.IDENTITY_ATTRIBUTES_DELETE]: identityReducers.deleteIdAttributesReducer,
	// [types.]: identityReducers.setAttributeDocumentsReducer,
	// [types.]: identityReducers.deleteAttributeDocumentsReducer,
	[types.IDENTITY_ATTRIBUTE_ADD]: identityReducers.addIdAttributeReducer,
	// [types.]: identityReducers.addDocumentReducer,
	[types.IDENTITY_ATTRIBUTE_UPDATE]: identityReducers.updateIdAttributeReducer,
	// [types.]: identityReducers.updateDocumentReducer,
	// [types.]: identityReducers.deleteDocumentReducer,
	[types.IDENTITY_ATTRIBUTE_DELETE]: identityReducers.deleteIdAttributeReducer,
	[types.IDENTITIES_SET]: identityReducers.setIdentitiesReducer,
	[types.IDENTITY_ADD]: identityReducers.addIdentityReducer,
	[types.IDENTITY_UPDATE]: identityReducers.updateIdentityReducer,
	[types.IDENTITY_CURRENT_SET]: identityReducers.setCurrentIdentityReducer,
};

export default createReducer(initialState, reducersMap);

