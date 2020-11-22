import { BaseModel } from '../common/base-model';

export class KYCApplicationModel extends BaseModel {
  static instance: KYCApplicationModel;

  static schema = {
    name: 'KYCApplication',
    primaryKey: 'id',
    properties: {
      id: 'string',
      owner: 'string?',
      scope: 'string?',
      rpName: 'string?',
      title: 'string?',
      sub_title: 'string?',
      currentStatus: 'int?',
      currentStatusName: 'string?',
      applicationDate: 'string?' ,
      payments: {
        type: 'string?',
      },
      nextRoute: 'string?',
      identityId: 'int',
      templateId: 'string',
      messages: {
        type: 'string?',
      },
    },
  };

  static getInstance() {
    if (!KYCApplicationModel.instance) {
      KYCApplicationModel.instance = new KYCApplicationModel();
    }

    return KYCApplicationModel.instance;
  }

  constructor() {
    super(KYCApplicationModel.schema);
  }

  // findAllByIdentityId(identityId) {
	// 	return this.find('identityId = $0', identityId);
  // }

  applyCustomMapping(item) {
    try {
      item.payments = item.payments ? JSON.parse(item.payments) : [];
    } catch(err) {
      item.payments = [];
    }

    return item;
  }

  beforeCreate(item) {
    if (typeof item.payments === 'object') {
      item.payments = JSON.stringify(item.payments);
    }

    // item.createdAt = new Date();
    // item.updatedAt = item.createdAt;

    return item;
  }

  beforeUpdate(item) {
    if (typeof item.payments === 'object') {
      item.payments = JSON.stringify(item.payments);
    }

    // item.updatedAt = new Date();

    return item;
	}
}
