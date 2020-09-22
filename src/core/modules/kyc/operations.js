import kycActions from './actions';
// import { navigate, Routes } from '../../navigation';
// import { WalletModel, GuideSettingsModel, WalletTokenModel, IdAttributeTypeModel } from '../../models';
import * as selectors from './selectors';
import ducks from '../index';
import { getConfigs } from 'configs';
import RelyingPartySession from './relying-party';
import { Identity } from './identity';
import { Logger } from 'core/utils/logger';
import { resolveFileContent } from './file-utils';
import { normalizeDocumentsSchema } from '../identity/identity-attribute-utils';

const log = new Logger('kyc-operations');

const getDevRPDetails = () => {
  const configs = getConfigs();

  return {
    name: 'Dev',
    status: configs.kyccUrlOverride ? 'active' : 'inactive',
    description: 'Dev',
    relyingPartyConfig: {
      rootEndpoint: configs.kyccUrlOverride,
      did: true,
      endpoints: {
				"/templates/:id": "/templates/:id?format=minimum",
				"/kyc-users/me": "/users/me",
				"/kyc-users": "/users"
      }
    }
  };
}

export const messageFilter = (messages = []) => {
	let result = [];
	for (let m of messages) {
		let fm = {};
		fm.id = m.id;
		m.user.name ? (fm.name = m.user.name) : (fm.name = 'Certifier');
		m.roles === undefined || m.roles.length === 0
			? (fm.type = 'person')
			: (fm.type = 'certifier');
		fm.date = parseInt((new Date(m.createdAt).getTime() / 1000).toFixed(0));
		fm.message = m.message;
		result.push(fm);
	}
	return result;
};

const loadTemplateOperation = (templateId) => async (dispatch, getState) => {
  const data = await fetch(`https://dev.instance.kyc-chain.com/api/v2/templates/${templateId}`).then(res => res.json());
  dispatch(kycActions.setTemplate(data));
};

const getSession = async (config, authenticate, dispatch, walletType, loadInBackground = false) => async (dispatch, getState) => {
	// let mpService = (getGlobalContext() || {}).marketplaceService;
	let session;
	try {
		const state = getState();
		// TODO: get wallet 
		// TODO: get identity
		const wallet = ducks.wallet.selectors.getWallet(state);
		const identity = ducks.identity.selectors.selectIdentity(state);
		// session = mpService.createRelyingPartySession(config);
		const identityData = await Identity.create(wallet, identity);
	
		session = new RelyingPartySession(config, identityData);

	} catch (error) {
		// log.error('getSession createRelyingPartySession %s', error);
		// if (!loadInBackground) {
		throw error;
		// }
	}

	if (authenticate) {
		try {
			await session.establish();
		} catch (error) {
			log.error('getSession HD %s', error);

      // if (!loadInBackground) {
        // await dispatch(push('/main/auth-error'));
        throw error;
      // }
		}
	}

	return session;
};

const loadRelyingPartyOperation = (
	rpName,
	afterAuthRoute,
	cancelRoute,
	authenticate = true,
	loadInBackground = false
) => async (dispatch, getState) => {
	const state = getState();
	// const walletType = appSelectors.selectApp(state).walletType;
	if (!rpName) return null;

	const identity = ducks.identity.selectors.selectIdentity(state);

	if (!identity) return;

	const rp = getDevRPDetails();

	// marketplaceSelectors.selectRPDetails(state, rpName);
	// if (devRPDetails.status === 'active') {
	// 	log.debug('Selecting dev RP');
	// }

	const config = rp.relyingPartyConfig;
	if (!config.rootEndpoint) {
		// log.warn('Empty RP config object');
		return;
	}

  const ts = Date.now();

	try {
		// await dispatch(kycActions.setCancelRoute(cancelRoute));
		const session = await dispatch(getSession(
			config,
			authenticate,
			dispatch,
			// walletType,
			// loadInBackground
		));
		let templates = await Promise.all(
			(await session.listKYCTemplates()).map(async tpl => {
				const id = tpl.id || tpl.templateId;
				tpl = await session.getKYCTemplate(id);
				tpl.id = id;
				return tpl;
			})
		);


		let applications = [];
		if (authenticate) {
			applications = await session.listKYCApplications();
			
			debugger;
			// for (const application of applications) {
			// 	application.messages = await session.getKYCApplicationChat(application.id);
			// 	const formattedMessages = messageFilter(application.messages);
			// 	const template = templates.find(t => t.id === application.template);
			// 	await dispatch(
			// 		kycOperations.updateApplicationsOperation({
			// 			id: application.id,
			// 			identityId: identity.id,
			// 			rpName: rpName,
			// 			currentStatus: application.currentStatus,
			// 			currentStatusName: application.statusName,
			// 			owner: application.owner,
			// 			scope: application.scope,
			// 			applicationDate: application.createdAt,
			// 			title: template ? template.name : rpName,
			// 			templateId: template.id,
			// 			messages: formattedMessages
			// 		})
			// 	);
			// }

			// Access Token only exists for existing KYCC users
			if (applications.length) session.access_token = await session.getAccessToken();
		}

		await dispatch(
			kycActions.updateRelyingParty({
				name: rpName,
				description: rp.description,
				templates,
				applications,
				session,
				authenticated: authenticate,
				lastUpdated: ts
			})
		);

		// if (authenticate && afterAuthRoute) {
		// 	if (walletType === 'ledger' || walletType === 'trezor') {
		// 		clearTimeout(hardwalletConfirmationTimeout);
		// 	}
		// 	await dispatch(push(afterAuthRoute));
		// }
	} catch (error) {
		throw error;
		// log.error('Error loadRelyingParty %s', error);
		// await dispatch(
		// 	kycActions.updateRelyingParty(
		// 		{
		// 			name: rpName,
		// 			lastUpdated: ts
		// 		},
		// 		error
		// 	)
		// );
	}
};



const createRelyingPartyKYCApplication = (rpName, templateId, attributes, title) => async (
	dispatch,
	getState
) => {
	try {
		const state = getState();
		const rp = selectors.relyingPartySelector(rpName)(state);
		if (!rp || !rp.session) throw new Error('relying party does not exist');
		if (!rp.templates.find(tpl => tpl.id === templateId)) {
			throw new Error('template does not exist');
		}

		const identity = ducks.identity.selectors.selectIdentity(state);
		if (!identity) return;

		if (!rp.session.isActive()) {
			await rp.session.establish();
		}

		attributes = selectors.selectKYCAttributes(identity.id, attributes)(state);

		if (rp.session.ctx.hasKYCUserEndpoint() && !rp.session.ctx.user) {
			debugger;
			const userData = selectors.selectKYCUserData(identity.id, attributes)(state);
			await rp.session.createKYCUser(userData);
		}
		
		// Resolve attribute files
		attributes = await Promise.all(attributes.map(async (attr) => {
			const attrData = { ...attr };

			if (attrData.data && attrData.data.value) {
				console.log('process attrData', attrData);
				attrData.data = await resolveFileContent(attr.data);
				const result = normalizeDocumentsSchema(attrData.schema, attrData.data.value);
				attrData.data.value = result.value;
				attrData.documents = result.documents;
			}

			return attrData;
		}));
			
		let application = await rp.session.createKYCApplication(templateId, attributes);

		// application = await rp.session.getKYCApplication(application.id);
		// await dispatch(kycActions.addKYCApplication(rpName, { ...application, templateId }));
		// application.messages = await rp.session.getKYCApplicationChat(application.id);
		application.messages = [];
		const formattedMessages = messageFilter(application.messages);
		// await dispatch(
		// 	kycOperations.updateApplicationsOperation({
		// 		id: application.id,
		// 		identityId: identity.id,
		// 		rpName: rpName,
		// 		currentStatus: application.currentStatus,
		// 		currentStatusName: application.statusName,
		// 		owner: application.owner,
		// 		scope: application.scope,
		// 		applicationDate: application.createdAt,
		// 		title: title || rpName,
		// 		messages: formattedMessages
		// 	})
		// );
		return application;
	} catch (error) {
		log.error('createKycApplication %s', error);
		throw error;
	}
};

const submitApplicationOperation = (rpName, templateId, selected) => async (dispatch, getState) => {
	const state = getState();
  const requirements = selectors.selectRequirementsForTemplate(rpName, templateId)(state);
	const requiredAttributes = requirements.map(r => {
		const attributeName = `_${r.uiId}`;
		const selectedAttributeId =
			!r.options || !r.options.length ? null : selected[attributeName] || r.options[0].id;
		return {
			id: r.id,
			attributeId: selectedAttributeId,
			schemaId: r.schemaId,
			schema: r.schema || (r.type ? r.type.content : undefined),
			required: r.required,
			type: r.tType || 'individual'
		};
	});
	
	debugger;

	const application = await dispatch(
		createRelyingPartyKYCApplication(
			rpName,
			templateId,
			requiredAttributes,
			// title
			'Test Application'
		)
	);
	
	try {
		// await dispatch(
		// 	kycActions.setCurrentApplication(
		// 		relyingPartyName,
		// 		templateId,
		// 		returnRoute,
		// 		cancelRoute,
		// 		title,
		// 		description,
		// 		agreement,
		// 		vendor,
		// 		privacyPolicy,
		// 		termsOfService,
		// 		attributes
		// 	)
		// );
		

		try {
			// if (identity.type === 'corporate') {
				// await dispatch(
				// 	kycOperations.submitCurrentApplicationMembers(
				// 		selected,
				// 		application,
				// 		identity.id
				// 	)
				// );
			// }
		} catch (error) {
			// log.error('failed to submit member applications %s', error);
			// TODO: kycc internal api does not support status changes
			// await dispatch(
			// 	kycOperations.cancelRelyingPartyKYCApplication(
			// 		relyingPartyName,
			// 		application.id,
			// 		'Member submission error'
			// 	)
			// );
			// throw new Error('Failed to submit member applications');
		}

		// await dispatch(push(currentApplication.returnRoute));

		// return application;
	} catch (error) {
		// let applicationError = error;
		// if (error.error) {
		// 	applicationError = error.error;
		// }
		// log.error('submit application error %2j', applicationError);
		// await dispatch(
		// 	kycActions.setCurrentApplication(
		// 		relyingPartyName,
		// 		templateId,
		// 		returnRoute,
		// 		cancelRoute,
		// 		title,
		// 		description,
		// 		agreement,
		// 		vendor,
		// 		privacyPolicy,
		// 		termsOfService,
		// 		attributes,
		// 		applicationError
		// 	)
		// );
	} finally {
		// if (kycSelectors.relyingPartyShouldUpdateSelector(state, relyingPartyName)) {
		// 	await dispatch(kycOperations.loadRelyingParty(relyingPartyName));
		// }
	}
};

export const operations = {
	loadTemplateOperation,
	loadRelyingPartyOperation,
	submitApplicationOperation,
	createRelyingPartyKYCApplication,
};

export const appOperations = {
  ...kycActions,
  ...operations,
};

export default appOperations;
