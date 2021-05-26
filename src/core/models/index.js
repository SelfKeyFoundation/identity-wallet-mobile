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
import { KYCApplicationModel } from  './kyc/kyc-application-model';
import { ContractModel } from  './contracts/contract-model';
import { ContractAllowanceModel } from  './contracts/contract-allowance-model';

export const CURRENT_SCHEMA_VERSION = 14;
export const SCHEMA_NAME = '14-network-toggle';

import { getRealmInstance } from '../db/realm-service';
import { BaseModel } from './common/base-model';

BaseModel.getRealmInstance = getRealmInstance;

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
  KYCApplicationModel,
  ContractModel,
  ContractAllowanceModel,
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
  KYCApplicationModel,
  ContractModel,
  ContractAllowanceModel,
];
