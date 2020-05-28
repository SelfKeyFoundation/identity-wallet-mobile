import Ajv from 'ajv';
import RefParser from 'json-schema-ref-parser';
import { Logger } from '@selfkey/wallet-core/utils/logger';
import platformData from './platform-data.json';
import { sleep } from '../../utils/async';

const log = new Logger('json-schema-utils');

// const platformData = {
// 	repositories: {},
// 	schemas: {},
// }

// let timeout;

// function printPlatformData() {
// 	clearTimeout(timeout);

// 	timeout = setTimeout(() => {
// 		console.log(platformData);
// 		console.log(JSON.stringify(platformData));
// 	}, 5000);
// }

export const loadLocalRepository = (url) => platformData.repositories[url];

export const loadLocalSchema = (url) => platformData.schemas[url];

export const loadRemoteRepository = async (url, options = {}, attempt = 1) => {
	if (options.env === 'dev') {
		url = url.replace('/repository.json', '/dev-repository.json');
	}

	if (options.isLocal) {
		let data = loadLocalRepository(url);

		if (data) {
			return data;
		}
	}

	try {
		let res = await fetch(url);
		if (res.status >= 400) {
			throw new Error('Failed to fetch repository from remote');
		}
		const data = await res.json();
	
		// platformData.repositories[url] = data;

		// printPlatformData();

		return data;
	} catch (error) {
		log.error(`Load repository ${url} attempt ${attempt} error, ${error}`);
		if (attempt <= 3) {
			await sleep(attempt * 200);
			return loadRemoteRepository(url, options, attempt + 1);
		}
		throw error;
	}
};

export const containsFile = (schema, maxDepth = 10) => {
	if (maxDepth < 0) {
		return false;
	}
	if (schema.format === 'file') return true;

	if (schema.type === 'object') {
		if (!schema.properties) return false;
		for (let key in schema.properties) {
			if (!schema.properties.hasOwnProperty(key)) continue;
			if (containsFile(schema.properties[key], maxDepth - 1)) return true;
		}
		return false;
	}
	if (schema.type === 'array') {
		return containsFile(schema.items, maxDepth - 1);
	}
	return false;
};

export const removeMeta = (schema, maxDepth = 10) => {
	if (maxDepth < 0) {
		return schema;
	}
	schema = { ...schema };
	delete schema['$id'];
	delete schema['$schema'];

	if (schema.type === 'object' && schema.properties) {
		schema.properties = { ...schema.properties };
		for (let key in schema.properties) {
			if (!schema.properties.hasOwnProperty(key)) continue;
			schema.properties[key] = removeMeta(schema.properties[key], maxDepth - 1);
		}
	}
	if (schema.type === 'array') {
		schema.items = removeMeta(schema.items, maxDepth - 1);
	}
	return schema;
};

export const loadRemoteSchema = async (url, options = {}, attempt = 1) => {
	if (options.env === 'dev') {
		url = url.replace('/schema/', '/dev-schema/');
	}
	if (options.isLocal) {
		let data = loadLocalSchema(url);

		if (data) {
			return data;
		}
	}

	try {
		let res = await fetch(url);
		if (res.status >= 400) {
			throw new Error('Failed to fetch schema from remote');
		}
		const data = await res.json();

		// platformData.schemas[url] = data;

		// printPlatformData();

		return data;
	} catch (error) {
		log.error('Load schema %s attempt %d error, %s', url, attempt, error);
		if (attempt <= 3) {
			await sleep(attempt * 200);
			return loadRemoteSchema(url, options, attempt + 1);
		}
		throw error;
	}
};

export const dereference = (schema, options) => {
	const resolver = {
		order: 1,
		canRead: /platform\.selfkey\.org/i,
		async read(file) {
			return loadRemoteSchema(file.url, options);
		}
	};
	return RefParser.dereference(schema, { resolve: { selfkey: resolver } });
};

export const getDefaultRepo = (schema, options) => {
	if (!schema.identityAttributeRepository) {
		return null;
	}
	return options.env === 'dev'
		? schema.identityAttributeRepository.replace('/repository.json', '/dev-repository.json')
		: schema.identityAttributeRepository;
};

export const validate = (schema, value, validateSchema = true) => {
	const ajv = new Ajv({ validateSchema: true, allErrors: true });
	ajv.addFormat('file', () => {});
	const schemaId = schema.id || schema.$id;
	schema = removeMeta(schema);
	if (validateSchema && !ajv.validateSchema(schema)) return false;
	const ret = ajv.validate(schema, value);
	if (!ret) {
		log.error('validation error %s %2j %2j', schemaId, value, ajv.errors);
	}
	return ret;
};