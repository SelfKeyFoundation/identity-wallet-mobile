import platform from '../../assets/data/selfkey-platform.json';
import * as jsonSchema from './json-schema-utils';

const findAttributeType = id => {
	let attrs = platform.jsonSchemas.filter(attr => attr['$id'] === id);

	if (!attrs.length) return null;
	return attrs[0];
};

describe('Json Schema Utils', () => {
  describe('containsFile', () => {
    it('false if simple schema', () => {
      let attrTypeSchema = findAttributeType(
        'http://platform.selfkey.org/schema/attribute/email.json'
      );
      expect(jsonSchema.containsFile(attrTypeSchema)).toBe(false);
    });
    it('false if complext non file schema', () => {
      let attrTypeSchema = findAttributeType(
        'http://platform.selfkey.org/schema/attribute/physical-address.json'
      );
      expect(jsonSchema.containsFile(attrTypeSchema)).toBe(false);
    });
    it('true if simple file schema', () => {
      let attrTypeSchema = findAttributeType(
        'http://platform.selfkey.org/schema/attribute/tax-certificate.json'
      );
      expect(jsonSchema.containsFile(attrTypeSchema)).toBe(true);
    });
    it('true if complex file schema', () => {
      let attrTypeSchema = findAttributeType(
        'http://platform.selfkey.org/schema/attribute/national-id.json'
      );
      expect(jsonSchema.containsFile(attrTypeSchema)).toBe(true);
    });
  });
});
