import { BaseModel } from '../common/base-model';

export class TxHistoryModel extends BaseModel {
  static instance: TxHistoryModel;

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
      value: 'double',
      tokenName: 'string?',
      tokenSymbol: 'string?',
      tokenDecimal: 'int?',
      transactionIndex: 'int?',
      status: 'string?',
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

  prepareIdValue(value) {
    return `"${value}"`;
  }

  findByHash(hash) {
    return this.findOne(`hash = "${hash}"`)
  }

  updatePendingTxsByPublicKey(address) {

  }

  findByAddress(address) {
    const result = this._findAll()
      .filtered(`to="${address}" OR from="${address}"`)
      .sorted('timeStamp', true);

    return this.toJsonArray(result);
  }
}
