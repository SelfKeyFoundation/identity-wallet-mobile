import { WalletModel } from './wallet/wallet-model';
import { TestModel } from './common/test-model';
import { TokenModel } from './token/token-model';
import { WalletTokenModel } from './wallet-token/wallet-token-model';
import { GuideSettingsModel } from './guide-settings/guide-settings-model';
import { TxHistoryModel } from './tx-history/tx-history-model';
import { RepositoryModel } from './identity/repository-model';
import { IdentityModel } from './identity/identity-model';
import { IdAttributeModel } from './identity/id-attribute-model';
import { IdAttributeTypeModel } from './identity/id-attribute-type-model';
import { UISchemaModel } from  './identity/ui-schema-model';

// change to 9
export const CURRENT_SCHEMA_VERSION = 10;
export const SCHEMA_NAME = '9-biometrics-update';

export {
  WalletModel,
  TestModel,
  GuideSettingsModel,
  TokenModel,
  WalletTokenModel,
  TxHistoryModel,
  RepositoryModel,
  IdentityModel,
  IdAttributeModel,
  IdAttributeTypeModel,
  UISchemaModel,
};

export default [
  TestModel,
  WalletModel,
  GuideSettingsModel,
  TokenModel,
  WalletTokenModel,
  TxHistoryModel,
  RepositoryModel,
  IdentityModel,
  IdAttributeModel,
  IdAttributeTypeModel,
  UISchemaModel,
];
