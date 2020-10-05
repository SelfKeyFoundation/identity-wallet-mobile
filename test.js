const requre = require('request-promise-native');
const attrData = require('./attrData.json');

const normalizeDocumentsSchema = (
	typeSchema,
	value,
	documents = [],
	maxDepth = 10
) => {
	if (maxDepth < 0) {
		return { value, documents };
	}
	documents = [...documents];
	if (typeSchema.format === 'file') {
		if (!value || typeof value !== 'object' || Object.keys(value).length === 0)
			return { value, documents };
		let id = value.id;

		if (id) {
			documents = documents.filter(doc => doc.id !== id);
			documents.push(value);
			value = `$document-${id}`;
		} else {
			id = documents.length;
			documents.push({ ...value, '#id': `document${id}` });
			value = `$document-#ref{document${id}.id}`;
		}

		return { value, documents };
	}

	if (typeSchema.type === 'object' && typeof value === 'object') {
		if (!typeSchema.properties) return { value, documents };
		return Object.keys(typeSchema.properties).reduce(
			(acc, key) => {
				if (!value.hasOwnProperty(key)) {
					return acc;
				}
				let normalized = normalizeDocumentsSchema(
					typeSchema.properties[key],
					value[key],
					acc.documents,
					maxDepth - 1
				);
				acc.value[key] = normalized.value;
				acc.documents = normalized.documents;
				return acc;
			},
			{ value: {}, documents }
		);
	}

	if (typeSchema.type === 'array' && Array.isArray(value)) {
		return value.reduce(
			(acc, itm) => {
				let normalized = normalizeDocumentsSchema(
					typeSchema.items,
					itm,
					acc.documents,
					maxDepth - 1
				);
				acc.value.push(normalized.value);
				acc.documents = normalized.documents;
				return acc;
			},
			{ value: [], documents }
		);
	}

	return { value, documents };
};

const result = normalizeDocumentsSchema(attrData.schema, attrData.data.value);

console.log(result);