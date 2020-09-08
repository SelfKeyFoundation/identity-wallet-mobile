import sinon from 'sinon';
import uuid from 'uuid/v4';
import { UISchemaModel } from './ui-schema-model';

// id: 'int',
// name: 'string',
// identityId: 'int',
// typeId: 'int',
// data: 'string',
// env: 'string?'

const fixtures = [
  {
    id: 1,
    url: 'test url',
    repositoryId: 1,
    attributeTypeId: 1,
    content: '{}',
    expires: Date.now(),
    env: 'dev',
  },
  {
    id: 2,
    url: 'test url',
    repositoryId: 2,
    attributeTypeId: 2,
    content: '{}',
    expires: Date.now(),
    env: 'prod',
  },
];


describe('core/db/models/UISchemaModel', () => {
  const model = UISchemaModel.getInstance();

  it('expect schema to be defined', () => {
    expect(UISchemaModel.schema).toBeDefined();
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
      let testSchema = {
        test: 'test'
      };
      let testUrl = 'https://test-url/ui-schema.json';
      sinon.stub(global, 'fetch').resolves({
        status: 200,
        json() {
          return testSchema;
        }
      });

      let res = await model.loadRemote(testUrl);
  
      expect(res.url).toBe(testUrl);
      expect(res.content).toEqual(testSchema);
    });
  
    describe('addRemote', () => {
      let testUrl = 'https://test-url/ui-schema.json';
      const remoteContent = {
        test: 'test'
      };
      const remoteUISchema = {
        url: testUrl,
        expires: Date.now() + 3000000,
        content: remoteContent
      };

      it('it should update id attribute type if it exists', async () => {
        let createdUiSchemna = await model.create({
          id: model.generateId(),
          url: testUrl,
          repositoryId: 1,
          attributeTypeId: 1
        });
        sinon.stub(model, 'loadRemote').resolves(remoteUISchema);
        await model.addRemote(testUrl, 1);
        let updatedUISchema = await model.findById(createdUiSchemna.id);
        expect(updatedUISchema.updatedAt.getTime()).toBeGreaterThan(createdUiSchemna.updatedAt.getTime());
        expect(updatedUISchema.content).toEqual(remoteContent);
      });
  
      it('it should add new repo if it does not exists', async () => {
        let foundUISchema = await model.findByUrl(remoteUISchema.url, 1);
        expect(foundUISchema).toBeUndefined();
        sinon.stub(model, 'loadRemote').resolves(remoteUISchema);
        await model.addRemote(remoteUISchema.url, 1, 1);
        let addedUISchema = await model.findByUrl(remoteUISchema.url, 1);
        expect(addedUISchema.content).toEqual(remoteContent);
      });
    });
  });
});
