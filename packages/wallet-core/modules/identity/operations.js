import { IdentityService } from "./identity-service";
import actions from './actions';
import { Logger } from '@selfkey/wallet-core/utils/logger';
import duck from './index';

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
		log.error('failed to update repositories from remote ${error}');
	}

	await dispatch(identityOperations.loadIdAttributeTypesOperation());

	try {
		await dispatch(identityOperations.updateExpiredIdAttributeTypesOperation());
	} catch (error) {
		log.error(`failed to update id attribute types from remote ${error}`);
	}

	await dispatch(identityOperations.loadUISchemasOperation());

	try {
		await dispatch(identityOperations.updateExpiredUISchemasOperation());
	} catch (error) {
		log.error(`failed to update id attribute types from remote ${error}`);
	}

	// await ctx.store.dispatch(identityOperations.loadUiSchemasOperation());
	// try {
	// 	// TODO: should be in update manager
	// 	await ctx.store.dispatch(identityOperations.updateExpiredUiSchemasOperation());
	// } catch (error) {
	// 	log.error('failed to update ui schemas from remote %s', error);
	// }
}


export const operations = {
	loadIdentityOperation,
	loadRepositoriesOperation,
	updateExpiredRepositoriesOperation,
	loadIdAttributeTypesOperation,
	updateExpiredIdAttributeTypesOperation,
	loadUISchemasOperation,
	updateExpiredUISchemasOperation,
};

export const identityOperations = {
  ...actions,
  ...operations,
};

export default identityOperations;
