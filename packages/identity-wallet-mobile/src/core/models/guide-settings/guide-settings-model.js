import { BaseModel } from '../common/base-model';

export class GuideSettingsModel extends BaseModel {
  static instance: GuideSettingsModel;

  static schema = {
    name: 'GuideSettings',
    primaryKey: 'id',
    properties: {
      id: 'int',
      termsAccepted: 'bool',
      userId: 'string?',
      views: 'int?'
    },
  }

  static getInstance() {
    if (!GuideSettingsModel.instance) {
      GuideSettingsModel.instance = new GuideSettingsModel();
    }

    return GuideSettingsModel.instance;
  }

  constructor() {
    super(GuideSettingsModel.schema);
  }
}
