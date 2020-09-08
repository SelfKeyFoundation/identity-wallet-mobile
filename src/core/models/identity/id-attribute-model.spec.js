import uuid from 'uuid/v4';
import { IdAttributeModel } from './id-attribute-model';

// id: 'int',
// name: 'string',
// identityId: 'int',
// typeId: 'int',
// data: 'string',
// env: 'string?'

const fixtures = [
  {
    id: 1,
    name: 'attr name',
    identityId: 1,
    typeId: 1,
    data: 'data',
    env: 'prod',
  },
  {
    id: 2,
    name: 'attr name',
    identityId: 1,
    typeId: 1,
    data: 'data',
    env: 'prod',
  },
];


describe('core/db/models/IdAttributeModel', () => {
  const model = IdAttributeModel.getInstance();

  it('expect schema to be defined', () => {
    expect(IdAttributeModel.schema).toBeDefined();
  });

  it('expect to have realm instance', () => {
    expect(model.realm).toBeDefined();
  });

  describe('methods', () => {
    beforeEach(() => {
      model.removeAll();
      fixtures.map(model.create.bind(model));
    });

    it('findAll', () => {
      const items = model.findAll();
      expect(items.length).toEqual(fixtures.length);
    });
  });
});
