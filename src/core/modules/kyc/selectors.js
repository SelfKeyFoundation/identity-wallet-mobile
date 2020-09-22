// @flow
import uuidv1 from 'uuid/v1';
import ducks from '../';
import {
	EMAIL_ATTRIBUTE,
	ENTITY_NAME_ATTRIBUTE,
	FIRST_NAME_ATTRIBUTE,
	LAST_NAME_ATTRIBUTE,
	ENTITY_TYPE_ATTRIBUTE
} from '../identity/constants';

export const getRoot = state => state.kyc;


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