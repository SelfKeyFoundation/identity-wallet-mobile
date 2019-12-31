import { BaseModel } from '../common/base-model';

export class TxHistoryModel extends BaseModel {
  static instance: TxHistoryModel;
aa
  static schema = {
    name: 'TxHistory',
    primaryKey: 'hash',
    properties: {
      hash: 'string',
      blockNumber: 'int?',
      timeStamp: 'int',
      nonce: 'int',
      blockHash: 'string?',
      contractAddress: 'string?',
      from: 'string',
      to: 'string',
      value: 'int',
      tokenName: 'string?',
      tokenSymbol: 'string?',
      tokenDecimal: 'int?',
      transactionIndex: 'int?',
      gas:'int?',
      gasPrice: 'int',
      // cumulativeGasUsed: 'int',
      gasUsed: 'int?',
      // input: 'string',
      confirmations: 'int?',
      isError: 'bool?',
      txReceiptStatus: 'int?',
      networkId: 'int?'
    },
  }

  static getInstance() {
    if (!TxHistoryModel.instance) {
      TxHistoryModel.instance = new TxHistoryModel();
    }

    return TxHistoryModel.instance;
  }

  constructor() {
    super(TxHistoryModel.schema);
  }

  getIdProperty(){
    return 'hash';
  }

  findByHash(hash) {
    return this.findOne(`hash = '${hash}'`)
  }
}
