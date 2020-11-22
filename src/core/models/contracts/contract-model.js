import { BaseModel } from '../common/base-model';

export class ContractModel extends BaseModel {
  static instance: ContractModel;

  static schema = {
    name: 'Contract',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      type: 'string?',
      address: 'string',
      deprecated: {
        type: 'bool',
        default: false,
      },
      active: { type: 'bool', default: false },
      abi: { type: 'string', default: '[]' },
      config: { type: 'string', default: '{}' },
      env: 'string?',

      // id: { type: 'integer' },
      // name: 'string',
      // type: 'deposit',
      // address: { type: 'string' },
      // deprecated: { type: 'boolean', default: false },
      // active: { type: 'boolean', default: false },
      // abi: { type: 'array', default: [] },
      // config: { type: 'object', default: {} },
      // env: { type: 'string', enum: ['development', 'production', 'test'] }
    },
  };

  static getInstance() {
    if (!ContractModel.instance) {
      ContractModel.instance = new ContractModel();
    }

    return ContractModel.instance;
  }

  constructor() {
    super(ContractModel.schema);
  }
  
  beforeCreate(props) {
    if (!props.id) {
      props.id = this.generateId();
    }
    
    if (typeof props.abi === 'object') {
      props.abi = JSON.stringify(props.abi);
    }
    
    if (typeof props.config === 'object') {
      props.config = JSON.stringify(props.config);
    }

    return props;
  }
  
  applyCustomMapping(item) {
    item.abi = item.abi ? JSON.parse(item.abi) : [];
    item.config = item.config ? JSON.parse(item.config) : {};
    return item;
  }


  beforeUpdate(item) {
    if (typeof item.abi === 'object') {
      item.abi = JSON.stringify(item.abi);
    }
    
    if (typeof item.config === 'object') {
      item.config = JSON.stringify(item.config);
    }

    return item;
	}
}
