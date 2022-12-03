import _ from 'lodash';
import { createSelector } from 'reselect';
import * as jsonSchema from './json-schema-utils';
import * as identityAttributes from './identity-attribute-utils';
import { getWallet } from '../wallet/selectors';
import {
	BASIC_CORPORATE_ATTRIBUTES,
	BASIC_ATTRIBUTES,
	EMAIL_ATTRIBUTE,
	FIRST_NAME_ATTRIBUTE,
	LAST_NAME_ATTRIBUTE,
	MIDDLE_NAME_ATTRIBUTE,
	JURISDICTION_ATTRIBUTE,
	ENTITY_TYPE_ATTRIBUTE,
	TAX_ID_ATTRIBUTE,
	ENTITY_NAME_ATTRIBUTE,
	CREATION_DATE_ATTRIBUTE,
	COUNTRY_ATTRIBUTE,
	NATIONALITY_ATTRIBUTE,
	PHONE_NUMBER_ATTRIBUTE,
	CORPORATE_STRUCTURE_ATTRIBUTE,
	CORPORATE_MEMBER_INDIVIDUAL_ATTRIBUTES,
	CORPORATE_MEMBER_CORPORATE_ATTRIBUTES
} from './constants';

// TODO: Implement forceUpdateAttributes config
const forceUpdateAttributes = false;

const createRootSelector = rootKey => (...fields) => state => _.pick(state[rootKey], fields);

const selectRoot = createRootSelector('identity');
const selectProps = (...fields) => (state, props = {}) => _.pick(props, fields);


// ###########################
// ##### Repositories ########
// ###########################

export const getDIDStatus = (state) => state.identity.didStatus;

export const selectRepositories = createSelector(
	selectRoot('repositories', 'repositoriesById'),
	({ repositories, repositoriesById }) => repositories.map(id => repositoriesById[id])
);

export const selectExpiredRepositories = state => {
	let now = Date.now();
	return selectRepositories(state).filter(repo => forceUpdateAttributes || repo.expires <= now);
};


// ###########################
// ##### Attribute Types #####
// ###########################

export const selectIdAttributeTypes = createSelector(
	selectRoot('idAtrributeTypes', 'idAtrributeTypesById'),
	({ idAtrributeTypes, idAtrributeTypesById }) =>
		idAtrributeTypes.map(id => idAtrributeTypesById[id]).filter(t => t && t.content)
);

// props: entityType, includeSystem
export const selectAttributeTypesFiltered = createSelector(
	selectIdAttributeTypes,
	selectProps('entityType', 'includeSystem'),
	(attributeTypes = [], filters = {}) => {
		let { entityType = ['individual'], includeSystem = false } = filters;

		if (!Array.isArray(entityType)) {
			entityType = [entityType];
		}
		return attributeTypes.filter(t => {
			if (t.content.system && !includeSystem) return false;

			if (!t.content.entityType && !entityType.includes('individual')) {
				return false;
			}
			let hasEntityType = entityType.reduce((acc, curr) => {
				if (acc) return acc;
				return (t.content.entityType || ['individual']).includes(curr);
			}, false);
			return hasEntityType;
		});
	}
);

export const selectExpiredIdAttributeTypes = state => {
	let now = Date.now();
	return selectAttributeTypesFiltered(state, {
		entityType: ['individual', 'corporate'],
		includeSystem: true
	}).filter(attributeType => forceUpdateAttributes || attributeType.expires <= now);
};

// props: attributeTypeUrl
export const selectAttributeTypeByUrl = createSelector(
	state => selectAttributeTypesFiltered(state, { entityType: 'corporate', includeSystem: true }),
	selectProps('attributeTypeUrl'),
	(attributeTypes, { attributeTypeUrl }) => attributeTypes.find(t => t.url === attributeTypeUrl)
);

// props: attributeTypeUrl
export const selectIdAttributeTypeByUrl = createSelector(
	selectIdAttributeTypes,
	selectProps('attributeTypeUrl'),
	(attributeTypes, { attributeTypeUrl }) => attributeTypes.find(t => t.url === attributeTypeUrl)
);

// ######################
// ##### UI Schemas #####
// ######################

export const selectUISchemas = createSelector(
	selectRoot('uiSchemas', 'uiSchemasById'),
	({ uiSchemas = [], uiSchemasById = {} }) => uiSchemas.map(id => uiSchemasById[id])
);

export const selectExpiredUISchemas = state => {
	let now = Date.now();
	return selectUISchemas(state).filter(
		uiSchema => forceUpdateAttributes || uiSchema.expires <= now
	);
};

const _selectUiSchema = (schemas = [], { typeId, repositoryId }) =>
	schemas.find(s => s.repositoryId === repositoryId && typeId === s.attributeTypeId);

export const selectUiSchema = createSelector(
	selectUISchemas,
	selectProps('typeId', 'repositoryId'),
	_selectUiSchema
);

export const selectRepositoryUiSchemaMap = createSelector(
	selectUISchemas,
	uiSchemas =>
		uiSchemas.reduce((acc, curr) => {
			if (!acc[curr.repositoryId]) {
				acc[curr.repositoryId] = {};
			}
			if (!acc[curr.repositoryId][curr.attributeTypeId]) {
				acc[curr.repositoryId][curr.attributeTypeId] = curr;
			}
			return acc;
		}, {})
);

// ######################
// ###### Documents #####
// ######################

export const selectDocuments = createSelector(
	selectRoot('documents', 'documentsById'),
	({ documents, documentsById }) => documents.map(docId => documentsById[docId])
);

export const selectDocumentsByAttributeIds = createSelector(
	selectDocuments,
	selectProps('attributeIds'),
	(documents, { attributeIds = null }) =>
		documents.reduce((acc, curr) => {
			if (attributeIds !== null && !attributeIds.includes(curr.attributeId)) return acc;
			acc[curr.attributeId] = acc[curr.attributeId] || [];
			acc[curr.attributeId].push(curr);
			return acc;
		}, {})
);

// ######################
// ###### Identity ######
// ######################

export const selectIdentity = createSelector(
	selectRoot('currentIdentity', 'identitiesById'),
	selectProps('identityId'),
	({ currentIdentity, identitiesById }, { identityId }) => {
		const identity = identitiesById[identityId || currentIdentity];
		if (identity && !identity.type) {
			return { ...identity, type: 'individual' };
		}
		return identity;
	}
);

export const selectIdentities = createSelector(
	selectRoot('identities', 'identitiesById'),
	selectProps('rootIdentities'),
	({ identities, identitiesById }, { rootIdentities = true }) => {
		const fullIdentities = identities.map(id => identitiesById[id]);
		// if (rootIdentities) {
		// 	return fullIdentities.filter(ident => ident.rootIdentity);
		// }
		return fullIdentities;
	}
);

export const selectFullIdentityHierarchy = createSelector(
	state => selectIdentities(state, { rootIdentities: false }),
	identities =>
		identities.reduce((acc, curr) => {
			let parentId = curr.parentId;
			if (curr.rootIdentity) {
				parentId = 'root';
			}
			acc[parentId] = acc[parentId] || [];
			acc[parentId].push(curr);
			return acc;
		}, {})
);

const _selectChildrenIdentities = (identity, hierarchy) => {
	if (!hierarchy[identity.id]) return [];
	return hierarchy[identity.id];
};

// props: identityId
export const selectChildrenIdentities = createSelector(
	selectIdentity,
	selectFullIdentityHierarchy,
	_selectChildrenIdentities
);

export const selectMemberIdentities = createSelector(
	selectIdentity,
	selectFullIdentityHierarchy,
	(identity, hierarchy) => {
		if (!identity || identity.type === 'individual') {
			return [];
		}
		let members = _selectChildrenIdentities(identity, hierarchy);
		let i = 0;
		while (i < members.length) {
			const children = _selectChildrenIdentities(members[i], hierarchy);
			members = members.concat(children);
			i++;
		}
		return members;
	}
);

// ##########################
// ##### ID Attributes ######
// ##########################

export const selectIdAttributes = createSelector(
	selectIdentity,
	selectRoot('attributes', 'attributesById'),
	(identity, { attributes = [], attributesById = {} }) => {
		const selectedAttr = attributes.map(attrId => attributesById[attrId]);
		if (identity) {
			return selectedAttr.filter(attr => attr.identityId === identity.id);
		}
		return selectedAttr;
	}
);

const validateAttribute = createSelector(
	props => props,
	({ schema, value, documents, validateSchema }) =>
		identityAttributes.validate(schema, value, documents, validateSchema)
);

// props: identityId, attributesIds = null
export const selectFullIdAttributesByIds = createSelector(
	selectIdAttributes,
	selectDocumentsByAttributeIds,
	selectRepositoryUiSchemaMap,
	selectRoot('idAtrributeTypesById', 'repositoriesById'),
	selectProps('attributeIds'),
	(
		attributes,
		documents,
		uiSchemaMap,
		{ idAtrributeTypesById, repositoriesById },
		{ attributeIds }
	) => {
		return attributes
			.filter(attr => !attributeIds || attributeIds.includes(attr.id))
			.map(attr => {
				const type = idAtrributeTypesById[attr.typeId];
				const defaultRepository = repositoriesById[type.defaultRepositoryId || 1];
				const defaultUiSchema = uiSchemaMap[defaultRepository.id][type.id];
				const attrDocs = documents[attr.id] || [];
				const isValid = validateAttribute({
					schema: type.content,
					value: attr.data.value,
					documents: attrDocs,
					validateSchema: false
				});
				return {
					...attr,
					type,
					defaultRepository,
					defaultUiSchema,
					isValid,
					documents: attrDocs
				};
			})
			.filter(attr => attr.type && attr.type.content);
	}
);

export const selectBasicAttributes = createSelector(
	selectIdentity,
	selectFullIdAttributesByIds,
	(identity, allAttributes) =>
		allAttributes.reduce(
			(acc, curr) => {
				const { url } = curr.type;
				if (identity.type === 'individual' && !BASIC_ATTRIBUTES[url]) return acc;
				if (identity.type === 'corporate' && !BASIC_CORPORATE_ATTRIBUTES[url]) return acc;
				if (acc.seen[url]) return acc;
				acc.seen[url] = 1;
				acc.attrs.push(curr);
				return acc;
			},
			{ seen: {}, attrs: [] }
		).attrs
);

export const selectNotBasicAttributes = createSelector(
	selectFullIdAttributesByIds,
	selectBasicAttributes,
	(allAttributes, basicAttributes) =>
		allAttributes.filter(attr => !basicAttributes.find(battr => battr.id === attr.id))
);

export const selectInfoAttributes = createSelector(
	selectFullIdAttributesByIds,
	allAttributes => allAttributes.filter(attr => !jsonSchema.containsFile(attr.type.content))
);

export const selectNonBasicInfoAttributes = createSelector(
	selectNotBasicAttributes,
	nonBasicAttributes =>
		nonBasicAttributes.filter(attr => !jsonSchema.containsFile(attr.type.content))
);

export const selectDocumentAttributes = createSelector(
	selectFullIdAttributesByIds,
	allAttributes => allAttributes.filter(attr => jsonSchema.containsFile(attr.type.content))
);

export const selectNonBasicDocumentAttributes = createSelector(
	selectNotBasicAttributes,
	nonBasicAttributes =>
		nonBasicAttributes.filter(attr => jsonSchema.containsFile(attr.type.content))
);

export const selectAttributesByUrl = createSelector(
	selectFullIdAttributesByIds,
	selectProps('attributeTypeUrls'),
	(attributes, { attributeTypeUrls = [] }) =>
		attributes.filter(attr => attributeTypeUrls.includes(attr.type.url))
);

export const selectBasicAttributeInfo = attribute =>
	createSelector(
		() => attribute,
		selectBasicAttributes,
		(attribute, basicAttributes) => {
			let basicAttr = basicAttributes.find(attr => attr.type.url === attribute);
			if (!basicAttr || !basicAttr.data || !basicAttr.data.value) return '';
			return basicAttr.data.value;
		}
	);

export const selectAttributeValue = createSelector(
	selectFullIdAttributesByIds,
	selectProps('attributeTypeUrl'),
	(attributes, { attributeTypeUrl }) => {
		const attr = attributes.find(a => a.type.url === attributeTypeUrl);
		if (!attr || !attr.data || !attr.data.value) return '';
		return attr.data.value;
	}
);

// ##############################
// ####### Jurisdictions ########
// ##############################

const sortedItemsFromEnum = (value = 'code', name = 'name', propertyName) => idType => {
	if (!idType) {
		return [];
	}

	let items = idType.content.enum;
	let names = idType.content.entityName;

	if (propertyName && idType.content.properties && idType.content.properties[propertyName]) {
		items = idType.content.properties[propertyName].enum;
		names = idType.content.properties[propertyName].enumNames;
	}

	if (!items) {
		return [];
	}

	items = items.map((code, index) => ({
		[value]: code,
		[name]: !names ? items[index] : names[index]
	}));

	items.sort((a, b) => {
		var nameA = a[name].toUpperCase();
		var nameB = b[name].toUpperCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
	return items;
};

export const selectCorporateJurisdictions = createSelector(
	state => selectIdAttributeTypeByUrl(state, { attributeTypeUrl: JURISDICTION_ATTRIBUTE }),
	sortedItemsFromEnum()
);

// ##########################
// ####### Countries ########
// ##########################

export const selectCountries = createSelector(
	state => selectIdAttributeTypeByUrl(state, { attributeTypeUrl: COUNTRY_ATTRIBUTE }),
	sortedItemsFromEnum('country', undefined, 'country')
);


// ##########################
// ######## Profile #########
// ##########################

// Profile

export const selectProfile = createSelector(
	selectIdentity,
	getWallet,
	selectFullIdAttributesByIds,
	selectBasicAttributes,
	selectNotBasicAttributes,
	selectDocumentAttributes,
	selectNonBasicDocumentAttributes,
	selectInfoAttributes,
	selectNonBasicInfoAttributes,
	(
		identity,
		wallet,
		allAttributes,
		basicAttributes,
		notBasicAttributes,
		documentAttributes,
		nonBasicDocumentAttributes,
		infoAttributes,
		nonBasicInfoAttributes
	) => ({
		identity,
		wallet,
		allAttributes,
		basicAttributes,
		notBasicAttributes,
		documentAttributes,
		nonBasicDocumentAttributes,
		infoAttributes,
		nonBasicInfoAttributes
	})
);

// props: identityId (if null --> current),
export const selectIndividualProfile = createSelector(
	selectProfile,
	selectBasicAttributeInfo(EMAIL_ATTRIBUTE),
	selectBasicAttributeInfo(FIRST_NAME_ATTRIBUTE),
	selectBasicAttributeInfo(LAST_NAME_ATTRIBUTE),
	selectBasicAttributeInfo(MIDDLE_NAME_ATTRIBUTE),
	(
		{
			identity,
			wallet,
			allAttributes,
			basicAttributes,
			nonBasicInfoAttributes,
			documentAttributes
		},
		email,
		firstName,
		lastName,
		middleName
	) => ({
		identity,
		wallet,
		profilePicture: identity.profilePicture,
		allAttributes,
		attributes: nonBasicInfoAttributes,
		basicAttributes,
		documents: documentAttributes,
		attributeOptions: {},
		email,
		firstName,
		lastName,
		middleName
	})
);

const selectChildrenProfiles = createSelector(
	state => state,
	selectChildrenIdentities,
	(state, childrenIdentities = []) =>
		childrenIdentities.map(child =>
			child.type === 'individual' || !child.type
				? selectIndividualProfile(state, { identityId: child.id })
				: selectCorporateProfile(state, { identityId: child.id })
		)
);

// props: identityId, type ('corporate' or 'individual')
export const selectChildrenProfilesByType = createSelector(
	state => state,
	selectChildrenIdentities,
	selectProps('type'),
	(state, childrenIdentities, { type }) =>
		childrenIdentities
			.filter(c => c.type === type)
			.map(c => selectCorporateProfile(state, { identityId: c.id }))
);