import { setRealmInstance } from '../realm-service';
import { BaseModel } from './BaseModel';

describe('wallet-code/db/models/BaseModel', () => {
  const realmMock = {};
  const schema = {
    name: 'testSchema',
  };
  let model;

  beforeAll(() => {
    setRealmInstance(realmMock);
    model = new BaseModel(schema);
  });

  it('expect realm to be defined', () => {
    expect(model.realm).toEqual(realmMock);
  });

  it('expect schema to be defined', () => {
    expect(model.schema).toEqual(schema);
  });
});
