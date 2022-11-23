// @flow
import {v1 as uuid} from 'uuid';
import ducks from '../';
import {
	EMAIL_ATTRIBUTE,
	ENTITY_NAME_ATTRIBUTE,
	FIRST_NAME_ATTRIBUTE,
	LAST_NAME_ATTRIBUTE,
	ENTITY_TYPE_ATTRIBUTE
} from '../identity/constants';
import { APPLICATION_ANSWER_REQUIRED, APPLICATION_APPROVED, APPLICATION_CANCELLED, APPLICATION_REJECTED } from './kyc-status-codes';

export const ApplicationStatus = {
  unpaid:'unpaid',
  completed: 'completed',
  rejected: 'rejected',
  progress: 'progress',
  additionalRequirements: 'additionalRequirements',
}

export const getRoot = state => state.kyc;

export const kycSelector = (state) => state.kyc;

export const relyingPartySelector = (rpName) => state => {
  if (!rpName) return null;
  return getRoot(state).relyingPartiesByName[rpName];
}

export const selectTemplates = rpName => state => {
  const rp = relyingPartySelector(rpName)(state);
  if (!rp) return null;
  return rp.templates || [];
}

export const selectTemplate = (rpName, templateId) => state => {
  const templates = selectTemplates(rpName)(state);
  if (!templates) return null;
  return templates.find(tpl => tpl.id === templateId);
}

export const selectRequirementsForTemplate = (rpName, templateId) => (state) => {
  const template = selectTemplate(rpName, templateId)(state);

  if (!template) {
    return null;
  }

  const templateAttributes = template.attributes || [];
  const attributesBySchema = templateAttributes.reduce((acc, curr) => {
    if (typeof curr === 'string') {
      curr = { schemaId: curr };
    }
    acc[curr.schemaId] = [];
    return acc;
  }, {});
  const identity = ducks.identity.selectors.selectIdentity(state);
  const walletAttributes = ducks.identity.selectors
			.selectFullIdAttributesByIds(state, { identityId: identity.id })
			.reduce((acc, curr) => {
				if (!curr || !curr.type || !curr.type.url) return acc;
				if (!acc.hasOwnProperty(curr.type.url)) return acc;

				acc[curr.type.url].push(curr);
				return acc;
      }, attributesBySchema);
      
  const tplOccurrence = templateAttributes.reduce((acc, curr) => {
    const schemaId = curr.schemaId || curr;
    acc[schemaId] = (acc[curr.schemaId] || 0) + 1;
    return acc;
  }, {});

  const requirements = templateAttributes.map(tplAttr => {
    if (typeof tplAttr === 'string') {
      tplAttr = { schemaId: tplAttr };
    }
    return {
      uiId: tplAttr.id || uuidv1(),
      id: tplAttr.id,
      required: !!tplAttr.required,
      schemaId: tplAttr.schemaId,
      options: walletAttributes[tplAttr.schemaId],
      title: tplAttr.title,
      description: tplAttr.description,
      tType: tplAttr.type,
      type:
        walletAttributes[tplAttr.schemaId] && walletAttributes[tplAttr.schemaId].length
          ? walletAttributes[tplAttr.schemaId][0].type
          : ducks.identity.selectors.selectIdAttributeTypeByUrl(state, {
              attributeTypeUrl: tplAttr.schemaId
            }),
      duplicateType: tplOccurrence[tplAttr.schemaId] > 1
    };
  });

  return requirements;
}

export const selectKYCUserData = (identityId, kycAttributes = []) => state => {
  const attributes = [
    EMAIL_ATTRIBUTE,
    FIRST_NAME_ATTRIBUTE,
    LAST_NAME_ATTRIBUTE,
    ENTITY_NAME_ATTRIBUTE,
    ENTITY_TYPE_ATTRIBUTE
  ].map(url => {
    let attr = kycAttributes.find(attr => attr.schemaId === url);
    if (!attr) {
      attr = (ducks.identity.selectors.selectAttributesByUrl(state, {
        identityId,
        attributeTypeUrls: [url]
      }) || [])[0];
    }
    return {
      url,
      value: attr && attr.data ? attr.data.value : null
    };
  });

  const attrData = attributes.reduce((acc, curr) => {
    const { url, value } = curr;
    if (acc[url]) return acc;
    acc[url] = value;
    return acc;
  }, {});

  const data = {
    email: attrData[EMAIL_ATTRIBUTE],
    name: attrData[ENTITY_NAME_ATTRIBUTE],
    entityType: attrData[ENTITY_TYPE_ATTRIBUTE]
  };

  if (!data.name) {
    data.name = `${attrData[FIRST_NAME_ATTRIBUTE]} ${attrData[LAST_NAME_ATTRIBUTE]}`;
  }
  return data;
}

export const selectKYCAttributes = (identityId, attributes = []) => state => {
  const kycAttributes = ducks.identity.selectors
    .selectFullIdAttributesByIds(state, {
      identityId,
      attributesIds: attributes.map(attr => attr.attributeId)
    })
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

  return attributes.map(attr => {
    const { id, attributeId, schemaId, schema, required } = attr;
    const loadedAttr = kycAttributes[attributeId];
    const finalAttr = {
      id,
      schemaId,
      schema,
      required
    };
    if (loadedAttr) {
      finalAttr.data = { ...loadedAttr.data };
      finalAttr.documents = [...loadedAttr.documents];
    }
    return finalAttr;
  });
}

export const selectApplications = (state) => {
  return kycSelector(state).applications.map(id => {
    return kycSelector(state).applicationsById[id];
  });
}

function isApplicationPaid(app) {
  return app.payments && app.payments.length;
}

function getApplicationStatus(application) {
  if (application.currentStatus === APPLICATION_APPROVED) {
    return ApplicationStatus.completed;
  }

  if (application.currentStatus === APPLICATION_REJECTED ||
    application.currentStatus === APPLICATION_CANCELLED) {
    return ApplicationStatus.rejected;
  }
  
  if (application.currentStatus === APPLICATION_ANSWER_REQUIRED) {
    return ApplicationStatus.additionalRequirements;
  } 

  if (!isApplicationPaid(application)) {
    return ApplicationStatus.unpaid;
  }
    
  return ApplicationStatus.progress;
}

export const selectLastApplication = (rpName, templateId) => state => {
  const rp = relyingPartySelector(rpName)(state);
  if (!rp || !rp.authenticated) return false;
  const { applications } = rp;
  if (!applications || applications.length === 0) return false;

  applications.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate > bDate ? 1 : -1;
  });

  let application;
  let index = applications.length - 1;
  for (; index >= 0; index--) {
    if (applications[index].template === templateId) {
      application = applications[index];
      break;
    }
  }

  if (application) {
    application.status = getApplicationStatus(application);
  }

  return application;
};
