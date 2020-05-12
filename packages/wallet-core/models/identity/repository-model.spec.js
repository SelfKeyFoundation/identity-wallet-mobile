import sinon from 'sinon';
import { RepositoryModel } from './repository-model';
import { IdAttributeModel, UISchemaModel, IdAttributeTypeModel } from '..';

const fixtures = [
  {
    id: 1,
    url: 'http://platform.selfkey.org/repository.json',
		name: 'Selfkey.org',
		eager: true,
		content: '{}',
    expires: Date.now(),
    env: 'prod'
  },
  {
    id: 2,
    url: 'http://platform.selfkey.org/dev-repository.json',
    name: 'Selfkey.org',
    eager: true,
    content: '{}',
    expires: Date.now(),
    env: 'dev'
  }
];

describe('core/db/models/RepositoryModel', () => {
  const model = RepositoryModel.getInstance();
  const idAttributeTypeModel = IdAttributeTypeModel.getInstance();
  const uiSchemaModel = UISchemaModel.getInstance();

  it('expect schema to be defined', () => {
    expect(RepositoryModel.schema).toBeDefined();
  });

  it('expect to have realm instance', () => {
    expect(model.realm).toBeDefined();
  });

  describe('methods', () => {
    afterEach(() => {
      sinon.restore();
    });

    beforeEach(() => {
      model.removeAll();
      fixtures.map(model.create.bind(model));
    });

    it('findAll', () => {
      const items = model.findAll();
      expect(items.length).toEqual(fixtures.length);
    });

    describe('remote', () => {
      it('loadRemote', async () => {
        let testRepo = {
          name: 'test',
          idAttributes: []
        };
        let testUrl = 'http://platform.selfkey.org/dev-repository.json';

        sinon.stub(global, 'fetch').resolves({
          status: 200,
          json() {
            return testRepo;
          }
        });

        let res = await model.loadRemote(testUrl);
    
        expect(res.url).toBe(testUrl);
        expect(res.content).toEqual(testRepo);
        expect(res.name).toEqual(testRepo.name);
      });
    });

    describe('addRemoteRepo', () => {
      const remoteContent = {
        name: 'test',
        identityAttributes: [
          {
            ui: 'http://test-url/id-attribute-ui1.json',
            json: 'http://test-url/id-attribute1.json'
          },
          {
            ui: 'http://test-url/id-attribute-ui2.json',
            json: 'http://test-url/id-attribute2.json'
          },
          {
            ui: 'http://test-url/id-attribute-ui3.json',
            json: 'http://test-url/id-attribute3.json'
          },
          'http://test-url/id-attribute4.json'
        ]
      };

      const remoteRepo = {
        url: 'http://test-url.com',
        name: 'test',
        expires: Date.now() + 3000000,
        content: remoteContent
      };

      const testRepo = {
        id: 3,
        url: 'http://test-url.com',
        name: 'Selfkey.org',
        eager: true,
        content: '{}',
        expires: Date.now(),,
        env: 'prod'
      }

      it('it should update repo if it exists', async () => {
        let createdRepo = await model.create(testRepo);
        sinon.stub(model, 'loadRemote').resolves(remoteRepo);
        await model.addRemoteRepo(testRepo.url);
        let updatedRepo = await model.findById(createdRepo.id);

        expect(updatedRepo.updatedAt.getTime()).toBeGreaterThan(createdRepo.updatedAt.getTime());
        expect(updatedRepo.content).toEqual(remoteContent);
        expect(updatedRepo.name).toEqual(remoteContent.name);
        // expect(updatedRepo.uiSchemas.length).toBe(3);
        // expect(updatedRepo.attributeTypes.length).toBe(4);
      });

      // it('it should add new repo if it does not exists', async () => {
      //   let foundRepo = await Repository.findByUrl(testRepo.url);
      //   expect(foundRepo).toBeUndefined();
      //   sinon.stub(Repository, 'loadRemote').resolves(remoteRepo);
      //   await Repository.addRemoteRepo(testRepo.url);
      //   let addedRepo = await Repository.findByUrl(testRepo.url).eager(
      //     '[uiSchemas, attributeTypes]'
      //   );
      //   expect(addedRepo.content).toEqual(remoteContent);
      //   expect(addedRepo.name).toEqual(remoteContent.name);
      //   expect(addedRepo.attributeTypes.length).toBe(4);
      //   expect(addedRepo.uiSchemas.length).toBe(3);
      // });
    });

    describe('deleteAttribute', () => {
      it('id attribure type with no other attached repos and no id attributes should be deleted', async () => {
        let repo = await model.findById(1);
        let attr = {
          json: 'http://test-url/schema.json',
          ui: 'http://test-url/ui1.json'
        };
        await model.addAttribute(attr, repo);
        await model.deleteAttribute(attr, repo);
  
        expect(await uiSchemaModel.findByUrl(attr.ui, repo.id)).toBeUndefined();
        expect(await idAttributeTypeModel.findByUrl(attr.json)).toBeUndefined();
      });

      // TODO: Implement this logic on IdAttributes BET
      it('id attribute type with no other attached repos but with attributes should be redirected to null repo', async () => {
        // let repo1 = await Repository.findById(1);
        // let attr = {
        //   json: 'http://test-url/schema.json',
        //   ui: 'http://test-url/ui1.json'
        // };
        // await repo1.addAttribute(attr);
        // let attrType = await IdAttributeType.findByUrl(attr.json);
        // await IdAttribute.create({
        //   identityId: 1,
        //   typeId: attrType.id
        // });
        // await repo1.deleteAttribute(attr);
        // attrType = await IdAttributeType.findByUrl(attr.json);
        // expect(attrType).toBeDefined();
        // expect(await UiSchema.findByUrl(attr.ui, repo1.id)).toBeUndefined();
      });
    });
  });
});
