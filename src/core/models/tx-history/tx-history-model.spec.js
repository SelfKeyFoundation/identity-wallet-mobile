import uuid from 'uuid/v4';
import { TxHistoryModel } from './tx-history-model';
import { createContext } from 'jest-runtime';

const txMock = {
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
  gasUsed: 10,
  status: 'sent',
  confirmations: 1,
  isError: false,
  txReceiptStatus: 0,
  networkId: 1
};

function createTx(fromAddress, toAddress, status) {
  return {
    ...txMock,
    hash: uuid(),
    to: toAddress,
    from: fromAddress,
    status: status || txMock.status,
  };
}

const fixtures = [
  createTx('addr1', 'addr2'),
  createTx('addr3', 'addr4'),
  createTx('addr3', 'addr4'),
  createTx('addr3', 'addr5'),
];


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
        value: 0.002
      });

      const item = model.findById(data.hash);
      expect(item.value).toEqual(0.002);
    });

    describe('findByAddress', () => {
      it('expect to have 1 transaction for addr1, addr2 and addr5', () => {
        expect(model.findByAddress('addr1')).toHaveLength(1);
        expect(model.findByAddress('addr2')).toHaveLength(1);
        expect(model.findByAddress('addr5')).toHaveLength(1);
      });

      it('expect to have 2 transactions for addr4', () => {
        expect(model.findByAddress('addr4')).toHaveLength(2);
      });

      it('expect to have 3 transactions for addr3', () => {
        expect(model.findByAddress('addr3')).toHaveLength(3);
      });
    });
  });
});
