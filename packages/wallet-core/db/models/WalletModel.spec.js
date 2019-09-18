import { WalletModel } from './WalletModel';

describe('core/db/models/WalletModel', () => {
  let model;

  beforeAll(() => {
    model = new WalletModel();
  });

  it('expect schema to be defined', () => {
    expect(WalletModel.schema).toBeDefined();
  });

  it('expect schema to have a name', () => {
    expect(WalletModel.schema.name).toBeDefined();
  });

  it('expect schema to be defined in base model', () => {
    expect(model.schema).toBeDefined();
  });
});
