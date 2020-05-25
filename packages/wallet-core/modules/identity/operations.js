import { IdentityService } from "./identity-service";
import actions from './actions';
import { Logger } from '@selfkey/wallet-core/utils/logger';
import duck from './index';
import ducks from '../index';
import { System } from '../../system';
import {
	ENTITY_NAME_ATTRIBUTE,
	ENTITY_TYPE_ATTRIBUTE,
	JURISDICTION_ATTRIBUTE,
	CREATION_DATE_ATTRIBUTE,
	EMAIL_ATTRIBUTE,
	TAX_ID_ATTRIBUTE,
	FIRST_NAME_ATTRIBUTE,
	LAST_NAME_ATTRIBUTE,
	individualMemberAttributes,
	corporateMemberAttributes
} from './constants';
import { navigate, Routes } from "../../navigation";
import { WalletModel } from "../../models";

const log = new Logger('identity-operations');

// ########################
// ##### Repositories #####
// ########################

export const loadRepositoriesOperation = () => async (dispatch, getState) => {
	const repos = await IdentityService.loadRepositories();
	await dispatch(actions.setRepositories(repos));
}

export const updateExpiredRepositoriesOperation = () => async (dispatch, getState) => {
	const expired = duck.selectors.selectExpiredRepositories(getState());
	log.debug(`Detected expired repositories ${expired.map(e => e.url)}`);
	await IdentityService.updateRepositories(expired);
	await dispatch(identityOperations.loadRepositoriesOperation());
}

export const editIdAttributeOperation = attribute => async (dispatch, getState) => {
	await IdentityService.editIdAttribute(attribute);
	// await dispatch(operations.loadDocumentsForAttributeOperation(attribute.id));
	await dispatch(actions.updateIdAttribute(attribute));

	System.getTracker().trackEvent({
		category: `selfKeyProfile/idAttribute`,
		action: 'edit',
		level: 'wallet'
	});
};

// ########################
// ### Attribute Types ####
// ########################
export const loadIdAttributeTypesOperation = () => async (dispatch, getState) => {
	let attributeTypes = await IdentityService.loadIdAttributeTypes();
	await dispatch(actions.setIdAttributeTypes(attributeTypes));
	log.debug(`Identity attribute types loaded ${attributeTypes.map(t => t.url)}`, );
}

export const updateExpiredIdAttributeTypesOperation = () => async (dispatch, getState) => {
	let expired = duck.selectors.selectExpiredIdAttributeTypes(getState());
	log.debug(`Detected expired identity attribute types ${expired.map(e => e.url)}`);
	await IdentityService.updateIdAttributeTypes(expired);
	await dispatch(identityOperations.loadIdAttributeTypesOperation());
}

// ########################
// ###### UI Schema  ######
// ######################## 
export const loadUISchemasOperation = () => async (dispatch, getState) => {
	let uiSchemas = await IdentityService.loadUISchemas();
	await dispatch(actions.setUISchemas(uiSchemas));
}

export const updateExpiredUISchemasOperation = () => async (dispatch, getState) => {
	let expired = duck.selectors.selectExpiredUISchemas(getState());
	await IdentityService.updateUISchemas(expired);
	await dispatch(identityOperations.loadUISchemasOperation());
}


export const loadIdentityOperation = () => async (dispatch, getState) => {
	// TODO: Implement forceUpdateAttributes
	await dispatch(identityOperations.loadRepositoriesOperation());

	try {
		await dispatch(identityOperations.updateExpiredRepositoriesOperation());
	} catch (error) {
		console.error(error);
		log.error(`failed to update repositories from remote ${error}`);
	}

	await dispatch(identityOperations.loadIdAttributeTypesOperation());

	try {
		await dispatch(identityOperations.updateExpiredIdAttributeTypesOperation());
	} catch (error) {
		console.error(error);
		log.error(`failed to update id attribute types from remote ${error}`);
	}

	await dispatch(identityOperations.loadUISchemasOperation());

	try {
		await dispatch(identityOperations.updateExpiredUISchemasOperation());
	} catch (error) {
		console.error(error);
		log.error(`failed to update id attribute types from remote ${error}`);
	}
}

const lockIdentityOperation = identityId => async (dispatch, getState) => {
	let identity = null;
	if (identityId) {
		identity = duck.selectors.selectIdentity(getState(), { identityId });
	} else {
		// identity = duck.selectors.selectCurrentIdentity(getState());
	}
	if (!identity) {
		return;
	}
	if (identity.rootIdentity) {
		await dispatch(identityOperations.setCurrentIdentity(null));
	}
	identityId = identity.id;
	await dispatch(duck.actions.deleteIdAttributes(identityId));
	// await dispatch(identityActions.deleteDocuments(identityId));
	if (!identity.rootIdentity) {
		return;
	}
	// const members = duck.selectors.selectMemberIdentities(getState(), {
	// 	identityId: identity.id
	// });
	// await Promise.all(members.map(m => dispatch(identityOperations.lockIdentityOperation(m.id))));
};

const unlockIdentityOperation = identityId => async (dispatch, getState) => {
	const state = getState();
	if (!identityId) {
		const currentIdentity = duck.selectors.selectIdentity(state);
		if (currentIdentity) {
			identityId = currentIdentity.id;
		}
	}

	if (!identityId) {
		const identities = duck.selectors.selectIdentities(state);
		const defaultIdentity =
			identities.find(ident => ident.default || ident.type === 'individual') || identities[0];

		if (defaultIdentity) {
			identityId = defaultIdentity.id;
		}
	}

	if (!identityId) {
		throw new Error('could not unlock identity');
	}
	const identity = duck.selectors.selectIdentity(state, { identityId });
	if (!identity) {
		return;
	}

	// await dispatch(identityOperations.loadDocumentsOperation(identityId));
	await dispatch(identityOperations.loadIdAttributesOperation(identityId));
	// if (!identity.rootIdentity) {
	// 	return;
	// }
	// const members = duck.selectors.selectMemberIdentities(state, {
	// 	identityId
	// });
	// await Promise.all(members.map(m => dispatch(identityOperations.unlockIdentityOperation(m.id))));
	await dispatch(actions.setCurrentIdentity(identityId));
};

const loadIdentitiesOperation = walletId => async (dispatch, getState) => {
	let identities = await IdentityService.loadIdentities(walletId);
	await dispatch(duck.actions.setIdentities(identities));
};

const createIndividualProfile = (identityId, data) => async (dispatch, getState) => {
	const idAttributeTypes = duck.selectors.selectAttributeTypesFiltered(getState(), {
		entityType: 'individual'
	});

	const identity = duck.selectors.selectIdentity(getState(), { identityId });
	const getTypeId = url => {
		return idAttributeTypes.find(idAttributeType => idAttributeType.url === url).id;
	};

	await WalletModel.getInstance().updateByAddress(identity.walletId, {
		name: data.nickName,
	});

	await dispatch(
		identityOperations.createIdAttributeOperation({
			typeId: getTypeId(FIRST_NAME_ATTRIBUTE),
			name: data.firstName,
			data: { value: data.firstName }
		})
	);

	await dispatch(
		identityOperations.createIdAttributeOperation({
			typeId: getTypeId(LAST_NAME_ATTRIBUTE),
			name: data.lastName,
			data: { value: data.lastName }
		})
	);

	await dispatch(
		identityOperations.createIdAttributeOperation({
			typeId: getTypeId(EMAIL_ATTRIBUTE),
			name: data.email,
			data: { value: data.email }
		})
	);

	await dispatch(identityOperations.updateIdentitySetupOperation(true, identityId));

	System.getTracker().trackEvent({
		category: `selfKeyProfile`,
		action: 'created',
		level: 'wallet'
	});

	navigate(Routes.APP_MY_PROFILE);

	await dispatch(ducks.modals.operations.hideModal(Routes.MODAL_CREATE_SELFKEY_ID));
};

const loadIdAttributesOperation = identityId => async (dispatch, getState) => {
	let attributes = await IdentityService.loadIdAttributes(identityId);
	await dispatch(actions.setIdAttributes(identityId, attributes));
};

const updateIdentitySetupOperation = (isSetupFinished, id) => async (dispatch, getState) => {
	const identity = await IdentityService.updateIdentitySetup(isSetupFinished, id);

	await dispatch(actions.updateIdentity(identity));
};

const createIdAttributeOperation = (attribute, identityId) => async (dispatch, getState) => {
	let identity = null;

	if (identityId) {
		identity = duck.selectors.selectIdentity(getState(), { identityId });
		if (!identity) {
			throw new Error('identity not loaded');
		}
	} else {
		identity = duck.selectors.selectIdentity(getState());
		identityId = identity.id;
	}

	attribute = { ...attribute, identityId };
	attribute = await IdentityService.createIdAttribute(attribute);
	// await dispatch(operations.loadDocumentsForAttributeOperation(attribute.id));
	await dispatch(actions.addIdAttribute(attribute));
};

const updateProfilePictureOperation = (picture, identityId) => async (dispatch, getState) => {
	let identity = await IdentityService.updateIdentityProfilePicture(picture, identityId);
	await dispatch(actions.updateIdentity(identity));

	System.getTracker().trackEvent({
		category: `selfKeyProfile/picture`,
		action: 'edit',
		level: 'wallet'
	});
};


export const navigateToProfileOperation = () => async (dispatch, getState) => {
	const identity = duck.selectors.selectIdentity(getState());

	System.getTracker().trackEvent({
		category: `selfKeyProfile`,
		action: 'navigate',
		level: 'wallet'
	});

	if (!identity.isSetupFinished) {
		System.getTracker().trackEvent({
			category: `skProfile/createSelfKeyIdModal`,
			action: 'navigate',
			level: 'wallet'
		});

		dispatch(ducks.modals.operations.showModal(Routes.MODAL_CREATE_SELFKEY_ID));
		return;
	}

	navigate(Routes.APP_MY_PROFILE);
};

export const operations = {
	loadIdentityOperation,
	loadRepositoriesOperation,
	updateExpiredRepositoriesOperation,
	loadIdAttributeTypesOperation,
	updateExpiredIdAttributeTypesOperation,
	loadUISchemasOperation,
	updateExpiredUISchemasOperation,
	lockIdentityOperation,
	unlockIdentityOperation,
	loadIdAttributesOperation,
	createIdAttributeOperation,
	createIndividualProfile,
	loadIdentitiesOperation,
	navigateToProfileOperation,
	updateIdentitySetupOperation,
	editIdAttributeOperation,
	updateProfilePictureOperation
};

export const identityOperations = {
  ...actions,
  ...operations,
};

export default identityOperations;
