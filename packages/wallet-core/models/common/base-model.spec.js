import { getRealmInstance } from '../../db/realm-service';
import { BaseModel } from './base-model';
import { TestModel } from './test-model';
import { initTestRealm } from '../../tests/utils';

beforeAll(initTestRealm);

const fixtures = [{
  id: 1,
  name: 'test 1',
}, {
  id: 2,
  name: 'test 2',
}, {
  id: 3,
  name: 'test 3',
}];

const { schema } = TestModel;
const realm = getRealmInstance();

function createFixtures() {
  return realm.write(() => {
    let allItems = realm.objects(schema.name);
    realm.delete(allItems);
    fixtures.forEach(item => realm.create(schema.name, item));
  });
}

describe('wallet-code/db/models/BaseModel', () => {
  let model = new BaseModel(TestModel.schema);

  it('expect realm to be defined', () => {
    expect(model.realm).toEqual(getRealmInstance());
  });

  it('expect schema to be defined', () => {
    expect(model.schema).toEqual(TestModel.schema);
  });

  describe('methods', () => {
    beforeEach(createFixtures);

    it('findAll', () => {
      const items = model.findAll();
      expect(items).toHaveLength(fixtures.length);
    });

    it('findById', () => {
      const item = fixtures[0];
      const result = model.findById(item.id);
      expect(result.id).toEqual(item.id);
      expect(result.name).toEqual(item.name);
    });

    it('removeAll', () => {
      model.removeAll();
      const items = realm.objects(schema.name);
      expect(items).toHaveLength(0);
    });

    it('create', () => {
      const data = {
        id: 4,
        name: 'Test 4',
      };
      model.create(data);

      const item = model.findById(4);

      expect(item.id).toEqual(data.id);
      expect(item.name).toEqual(data.name);
    });

    it('removeById', () => {
      const item = fixtures[0];
      model.removeById(item.id);
      const result = model.findById(item.id);
      expect(result).not.toBeDefined();
    });

    it('updateById', () => {
      const item = fixtures[0];
      const newData = {
        name: 'name updated',
      }
      model.updateById(item.id, newData);
      const result = model.findById(item.id);
      expect(result.name).toEqual(newData.name);
    });

    describe('find', () => {
      it('query with id', () => {
        const items = model.find('id <= 2');
        expect(items).toHaveLength(2);
      });

      it('query with name', () => {
        const item = fixtures[0];
        const items = model.find('name = $0', item.name);
        expect(items).toHaveLength(1);
      });

      it('query with name like \'Test\'', () => {
        const items = model.find('name like "test*"');
        expect(items).toHaveLength(fixtures.length);
      });
    });

    it('findOne', () => {
      const data = fixtures[0];
      const item = model.findOne('id = $0', data.id);
      expect(item.id).toEqual(data.id);
      expect(item.name).toEqual(data.name);
    });
  });
});
