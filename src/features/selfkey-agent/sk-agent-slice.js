import { createSlice } from '@reduxjs/toolkit';
import SelfkeyAgent from '@selfkey/agent';
import Entities from '@selfkey/agent/lib/entities';

import { createConnection, Connection } from 'typeorm';
import modules from 'core/modules';
import { getTransactionCount } from 'core/modules/transaction/operations';
import { Storage } from 'core/Storage';

const kmsKey = '67626d4921b84328c8f4475d63dba8edfa7c7ddaea310e45b4576d72650c5008';

let agent: SelfkeyAgent;

const initialState = {
	loading: true,
	credentials: [
		{
			credentialSubject: {
				firstName: 'This should be',
				lastName: 'Invalid',
				nationality: 'Afghanistan',
				dateOfBirth: '2004-04-19',
				id: 'did:ethr:0xb6b7848286c0be7d5473620bbb3c3f12ea2ac11b',
			},
			id: 'invalid',
			issuer: { id: 'did:web:issuer.selfkey.org' },
			type: ['VerifiableCredential'],
			'@context': ['https://www.w3.org/2018/credentials/v1'],
			issuanceDate: '2021-04-22T10:30:15.000Z',
			proof: {
				type: 'JwtProof2020',
				jwt:
					'eyJhbGcUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJURVNUIiwibmF0aW9uYWxpdHkiOiJBZmdoYW5pc3RhbiIsImRhdGVPZkJpcnRoIjoiMjAwNC0wNC0xOSJ9LCJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl19LCJzdWIiOiJkaWQ6ZXRocjoweGI2Yjc4NDgyODZjMGJlN2Q1NDczNjIwYmJiM2MzZjEyZWEyYWMxMWIiLCJuYmYiOjE2MTkwODc0MTUsImlzcyI6ImRpZDp3ZWI6aXNzdWVyLnNlbGZrZXkub3JnIn0.M14ZC3Ly3x7gdc75PjAB_NbrlotIDcHFiytATGC7Vi6yjNwuiAQhkz6XzzEU532m5a1CP_jLksrGSdxNQFUz6w',
			},
		},
	],
	dids: [],
};

const skAgent = createSlice({
	name: 'skAgent',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.isLoading = action.payload;
		},
    setCredentials(state, action) {
      state.credentials = action.payload;
    },
		addDID(state, action) {
			if (!state.dids) {
				state.dids = [];
			}

			const itemFound = state.dids.find(item => item === action.payload);

			if (itemFound) {
				return;
			}

			state.dids.push(action.payload);
		},
		addCredential(state, action) {
			const itemFound = state.credentials.find(item => item.id === action.payload.id);

			if (itemFound) {
				return;
			}

			state.credentials.push(action.payload);
		},
	},
});

export const skAgentActions = skAgent.actions;

const getRoot = state => state.skAgent;

export const skAgentSelectors = {
	getLoading: state => getRoot(state).loading,
	getCredentials: state => getRoot(state).credentials,
	getDIDs: state => getRoot(state).dids || [],
};

export const skAgentOperations = {
	init: () => async (dispatch, getState) => {
		const dbConnection = createConnection({
			type: 'react-native',
			database: 'mobile-sk-agent',
			location: 'default',
			synchronize: true,
			logging: ['error', 'info', 'warn'],
			entities: Entities
		});
		
		agent = new SelfkeyAgent({
			dbConnection,
			kmsKey,
			didProvider: 'did:ethr:ropsten'
		});
	},
  createDID: () => async (dispatch, getState) => {
		const did = await agent.ensureAgentDID();
		dispatch(skAgentActions.addDID(did));
	},
};

export const skAgentReducer = skAgent.reducer;

export default {
	reducer: skAgentReducer,
	actions: skAgentActions,
	operations: skAgentOperations,
	selectors: skAgentSelectors,
};
