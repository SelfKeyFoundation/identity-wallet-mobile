
import { createReducer } from '../../redux/reducers';
import kycTypes from './types';
import _ from 'lodash';

export const initialState = {
  templates: {},
  relyingParties: [],
	relyingPartiesByName: {},
	currentApplication: null,
	cancelRoute: '',
	applications: [],
	applicationsById: {},
	processing: false
};

function setTemplateReducer(state, action) {
  const template = action.payload.template;

  return {
    ...state,
    templates: {
      ...state.templates,
      [template.id]: template,
    },
  };
}

const updateRelyingPartyReducer = (state, { error, payload }) => {
	if (Object.entries(payload).length === 0 && payload.constructor === Object) {
		return { ...state, relyingPartiesByName: {}, relyingParties: [] };
	}
	let relyingParties = [...state.relyingParties];
	let relyingPartiesByName = { ...state.relyingPartiesByName };
	if (!relyingPartiesByName[payload.name]) {
		relyingParties.push(payload.name);
	}
	relyingPartiesByName[payload.name] = { ...payload, error };
	return { ...state, relyingPartiesByName, relyingParties  };
};

const setApplicationsReducer = (state, { payload }) => {
	let applications = payload || [];
	let applicationsById = applications.reduce((acc, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});
	applications = _.uniq(applications.map(app => app.id));
	return { ...state, applications, applicationsById };
};

export const appReducers = {
  setTemplateReducer,
	updateRelyingPartyReducer,
	setApplicationsReducer
};

const reducersMap = {
  [kycTypes.SET_TEMPLATE]: appReducers.setTemplateReducer,
	[kycTypes.KYC_RP_UPDATE]: appReducers.updateRelyingPartyReducer,
	[kycTypes.KYC_APPLICATIONS_SET]: appReducers.setApplicationsReducer,
};

export default createReducer(initialState, reducersMap);
