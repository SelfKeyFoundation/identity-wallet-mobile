import sinon from 'sinon';
import uuid from 'uuid/v4';
import { IdAttributeTypeModel } from './id-attribute-type-model';

const fixtures = [
  {
    id: 1,
    url: 'test url',
    defaultRepositoryId: 1,
    content: '{}',
    expires: Date.now(),   
    env: 'prod'
  },
  {
    id: 2,
    url: 'test url',
    defaultRepositoryId: 2,
    content: '{}',
    expires: Date.now(),     
    env: 'dev'
  },
];

describe('core/db/models/IdAttributeTypeModel', () => {
  const model = IdAttributeTypeModel.getInstance();

  it('expect schema to be defined', () => {
    expect(IdAttributeTypeModel.schema).toBeDefined();
  });

  it('expect to have realm instance', () => {
    expect(model.realm).toBeDefined();
  });

  describe('methods', () => {
    beforeEach(() => {
      model.removeAll();
      sinon.restore();
      fixtures.map(model.create.bind(model));
    });

    it('findAll', () => {
      const items = model.findAll();
      expect(items.length).toEqual(fixtures.length);
    });

    it('loadRemote', async () => {
      let testScchema = {
        $id: 'https://test-url/id-attribute-type.json'
      };
      let testUrl = 'https://test-url/id-attribute-type.json';
      sinon.stub(global, 'fetch').resolves({
        status: 200,
        json() {
          return testScchema;
        }
      });
      let res = await model.loadRemote(testUrl);
  
      expect(res.url).toBe(testUrl);
      expect(res.content).toEqual(testScchema);
    });
  
    describe('addRemote', () => {
      const remoteContent = {
        $id: 'http://platform.selfkey.org/schema/attribute/public-key.json',
        $schema: 'http://platform.selfkey.org/schema/identity-attribute.json',
        identityAttribute: true,
        identityAttributeRepository: 'http://platform.selfkey.org/repository.json',
        title: 'Public Key',
        description: 'A cryptographic public key.',
        type: 'string'
      };
      const remoteIdAttribute = {
        url: 'http://test-url.com',
        defaultRepositoryId: 1,
        expires: Date.now() + 3000000,
        content: remoteContent
      };

      it('it should update id attribute type if it exists', async () => {
        let createdAttrType = await model.create({
          id: model.generateId(),
          url: 'http://test-url.com'
        });
        sinon.stub(model, 'loadRemote').resolves(remoteIdAttribute);
        await model.addRemote('http://test-url.com');
        let updatedAttrType = await model.findById(createdAttrType.id);
        expect(updatedAttrType.updatedAt.getTime()).toBeGreaterThan(createdAttrType.updatedAt.getTime());
        expect(updatedAttrType.content).toEqual(remoteContent);
      });

      it('it should add new repo if it does not exists', async () => {
        let foundAttrType = await model.findByUrl(remoteIdAttribute.url);
        expect(foundAttrType).toBeUndefined();
        sinon.stub(model, 'loadRemote').resolves(remoteIdAttribute);
        await model.addRemote(remoteIdAttribute.url);
        let addedRepo = await model.findByUrl(remoteIdAttribute.url);
        expect(addedRepo.content).toEqual(remoteContent);
      });
    });
  });
});
