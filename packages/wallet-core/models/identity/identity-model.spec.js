import uuid from 'uuid/v4';
import { IdentityModel } from './identity-model';

const fixtures = [
  {
    id: 1,
    walletId: 1,
    name: 'Test Identity',
    profilePicture: 'data',
    isSetupFinished: false,
  },
  {
    id: 2,
    walletId: 2,
    name: 'Test Identity 2',
    profilePicture: null,
    isSetupFinished: true,
  },
];

describe('core/db/models/IdentityModel', () => {
  const model = IdentityModel.getInstance();

  it('expect schema to be defined', () => {
    expect(IdentityModel.schema).toBeDefined();
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
