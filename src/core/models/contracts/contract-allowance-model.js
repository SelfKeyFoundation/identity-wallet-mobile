import { BaseModel } from '../common/base-model';

export class ContractAllowanceModel extends BaseModel {
  static instance: ContractAllowanceModel;

  static schema = {
    name: 'ContractAllowance',
    primaryKey: 'id',
    properties: {
      id: 'int',
      contractAddress: 'string',
      tokenAddress: 'string',
      tokenDecimals: {
        type: 'int?',
        default: 18
      },
      allowanceAmount: 'int?',
      walletId: 'int',
      env: 'string?',
    },
  };

  static getInstance() {
    if (!ContractAllowanceModel.instance) {
      ContractAllowanceModel.instance = new ContractAllowanceModel();
    }

    return ContractAllowanceModel.instance;
  }

  constructor() {
    super(ContractAllowanceModel.schema);
  }
  
  beforeCreate(props) {
    if (!props.id) {
      props.id = this.generateId();
    }

    return props;
  }
}
