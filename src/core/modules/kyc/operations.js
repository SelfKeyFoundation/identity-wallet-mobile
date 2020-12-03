import kycActions from './actions';
import * as selectors from './selectors';
import ducks from '../index';
import { getConfigs } from 'configs';
import RelyingPartySession from './relying-party';
import { Identity } from './identity';
import { Logger } from 'core/utils/logger';
import { resolveFileContent } from './file-utils';
import { normalizeDocumentsSchema } from '../identity/identity-attribute-utils';
import { KYCApplicationModel } from 'core/models';
import { getVendor } from 'screens/marketplaces/airtable-service';
import { mkpActions } from 'screens/marketplaces/mkpSlice';

const log = new Logger('kyc-operations');

export const getDevRPDetails = () => {
	const configs = getConfigs();

	return {
		name: 'Dev',
		status: configs.kyccUrlOverride ? 'active' : 'inactive',
		description: 'Dev',
		relyingPartyConfig: {
			rootEndpoint: configs.kyccUrlOverride,
			did: true,
			endpoints: {
				'/templates/:id': '/templates/:id?format=minimum',
				'/kyc-users/me': '/users/me',
				'/kyc-users': '/users',
			},
		},
	};
};

export const messageFilter = (messages = []) => {
	let result = [];
	for (let m of messages) {
		let fm = {};
		fm.id = m.id;
		m.user.name ? (fm.name = m.user.name) : (fm.name = 'Certifier');
		m.roles === undefined || m.roles.length === 0 ? (fm.type = 'person') : (fm.type = 'certifier');
		fm.date = parseInt((new Date(m.createdAt).getTime() / 1000).toFixed(0));
		fm.message = m.message;
		result.push(fm);
	}
	return result;
};

// TODO: Remove it, just used for testing purposes
const loadTemplateOperation = templateId => async (dispatch, getState) => {
	const data = await fetch(
		`https://dev.instance.kyc-chain.com/api/v2/templates/${templateId}`,
	).then(res => res.json());
	dispatch(kycActions.setTemplate(data));
};

const getSession = async (
	config,
	authenticate,
	dispatch,
	walletType,
	loadInBackground = false,
) => async (dispatch, getState) => {
	const state = getState();
	const wallet = ducks.wallet.selectors.getWallet(state);
	const identity = ducks.identity.selectors.selectIdentity(state);
	const identityData = await Identity.create(wallet, identity);
	const session = new RelyingPartySession(config, identityData);

	if (authenticate) {
		try {
			await session.establish();
		} catch (error) {
			log.error('getSession HD %s', error);
			throw error;
		}
	}

	return session;
};

const updateApplicationsOperation = application => async (dispatch, getState) => {
	const applicationModel = KYCApplicationModel.getInstance();
	await applicationModel.updateById(application.id, application);
	await dispatch(loadApplicationsOperation());
};

const loadApplicationsOperation = () => async (dispatch, getState) => {
	const identity = ducks.identity.selectors.selectIdentity(getState());
	const applications = await KYCApplicationModel.getInstance().find('identityId = $0', identity.id);
	dispatch(kycActions.setApplications(applications));
};

const loadRelyingPartyOperation = (
	rpName,
	afterAuthRoute,
	cancelRoute,
	authenticate = true,
	loadInBackground = false,
) => async (dispatch, getState) => {
	const state = getState();
	if (!rpName) return null;

	const identity = ducks.identity.selectors.selectIdentity(state);

	if (!identity) return;

	// const rp = getDevRPDetails();
	const rp = await getVendor(rpName);

	dispatch(loadApplicationsOperation());


	const config = rp.relyingPartyConfig;

	if (!config.rootEndpoint) {
		// log.warn('Empty RP config object');
		return;
	}

	const ts = Date.now();

	try {
		const session = await dispatch(
			getSession(
				config,
				authenticate,
				dispatch,
				// walletType,
				// loadInBackground
			),
		);
		let templates = await Promise.all(
			(await session.listKYCTemplates()).map(async tpl => {
				const id = tpl.id || tpl.templateId;
				tpl = await session.getKYCTemplate(id);
				tpl.id = id;
				return tpl;
			}),
		);

		let applications = [];
		if (authenticate) {
			applications = await session.listKYCApplications();

			for (const application of applications) {
				// application.messages = await session.getKYCApplicationChat(application.id);
				// const formattedMessages = messageFilter(application.messages);
				const template = templates.find(t => t.id === application.template);
				await dispatch(
					updateApplicationsOperation({
						id: application.id,
						identityId: identity.id,
						rpName: rpName,
						currentStatus: application.currentStatus,
						currentStatusName: application.statusName,
						owner: application.owner,
						scope: application.scope,
						applicationDate: application.createdAt,
						title: template ? template.name : rpName,
						templateId: template.id,
						payments: application.payments || [],
						// messages: formattedMessages
					}),
				);
			}

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
				lastUpdated: ts,
			}),
		);
	} catch (error) {
		log.error('Error loadRelyingParty %s', error);
		throw error;
	}
};

const updateRelyingPartyKYCApplicationPayment = (rpName, applicationId, transactionHash) => async (
	dispatch,
	getState,
) => {
	const rp = selectors.relyingPartySelector(rpName)(getState());

	if (!rp || !rp.session) throw new Error('relying party does not exist');

	if (!rp.session.isActive()) {
		await rp.session.establish();
	}

	await rp.session.updateKYCApplicationPayment(applicationId, transactionHash);

	rp.applications = await rp.session.listKYCApplications();
	await dispatch(kycActions.updateRelyingParty(rp));
};

const createRelyingPartyKYCApplication = (rpName, templateId, attributes, title) => async (
	dispatch,
	getState,
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
			const userData = selectors.selectKYCUserData(identity.id, attributes)(state);
			await rp.session.createKYCUser(userData);
		}

		// Resolve attribute files
		attributes = await Promise.all(
			attributes.map(async attr => {
				const attrData = { ...attr };

				if (attrData.data && attrData.data.value) {
					console.log('process attrData', attrData);
					attrData.data = await resolveFileContent(attr.data);
					const result = normalizeDocumentsSchema(attrData.schema, attrData.data.value);
					attrData.data.value = result.value;
					attrData.documents = result.documents;
				}

				return attrData;
			}),
		);

		let application = await rp.session.createKYCApplication(templateId, attributes);

		await dispatch(mkpActions.setLastApplication({
			...application,
			status: 'progress',
		}));

		application.messages = [];

		await dispatch(
			updateApplicationsOperation({
				id: application.id,
				identityId: identity.id,
				rpName: rpName,
				currentStatus: application.currentStatus,
				currentStatusName: application.statusName,
				owner: application.owner,
				scope: application.scope,
				applicationDate: application.createdAt,
				title: title || rpName,
				payments: application.payments || [],
				templateId: templateId,
			}),
		);
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
			type: r.tType || 'individual',
		};
	});

	const application = await dispatch(
		createRelyingPartyKYCApplication(
			rpName,
			templateId,
			requiredAttributes,
			// title
			'SelfKey Mobile Application',
		),
	);
};

export const operations = {
	loadTemplateOperation,
	loadRelyingPartyOperation,
	submitApplicationOperation,
	createRelyingPartyKYCApplication,
	updateRelyingPartyKYCApplicationPayment,
	loadApplicationsOperation,
};

export const appOperations = {
	...kycActions,
	...operations,
};

export default appOperations;
