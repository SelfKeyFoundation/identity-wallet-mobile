import uuid from 'uuid/v4';
import { TxHistoryModel } from './tx-history-model';

const fixtures = [{
  hash: 'test-hash',
  blockNumber: 0,
  timeStamp: 10000,
  nonce: 1,
  blockHash: 'block-hash',
  contractAddress: 'contract-address',
  from: 'from-address',
  to: 'to-address',
  value: 0.001,
  tokenName: 'Ethereum',
  tokenSymbol: 'ETH',
  tokenDecimal: 10,
  transactionIndex: 0,
  gas: 12000,
  gasPrice: 0.0002,
  // cumulativeGasUsed: 0,
  gasUsed: 10,
  // input: 'string',
  confirmations: 1,
  isError: false,
  txReceiptStatus: 0,
  networkId: 1
}];

describe('core/db/models/TxHistoryModel', () => {
  const model = TxHistoryModel.getInstance();

  it('expect schema to be defined', () => {
    expect(TxHistoryModel.schema).toBeDefined();
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

    it('findByHash', () => {
      const data = fixtures[0];
      const item = model.findByHash(data.hash);

      expect(item.hash).toEqual(data.hash);
      expect(item.to).toEqual(data.to);
      expect(item.isError).toEqual(false);
    });

    it('updateItem', () => {
      const data = fixtures[0];
      model.updateById(data.hash, {
        value: 0.00000000001
      });
      const item = model.findById(data.hash);
      expect(item.value).toEqual(0.00000000001);
    });
  });
});
