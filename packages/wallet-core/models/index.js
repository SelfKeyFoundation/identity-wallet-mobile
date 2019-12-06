import { WalletModel } from './wallet/wallet-model';
import { TestModel } from './common/test-model';
import { TokenModel } from './token/token-model';
import { WalletTokenModel } from './wallet-token/wallet-token-model';
import { GuideSettingsModel } from './guide-settings/guide-settings-model';

export const CURRENT_SCHEMA_VERSION = 1;
export const SCHEMA_NAME = 'init';

export {
  WalletModel,
  TestModel,
  GuideSettingsModel,
  TokenModel,
  WalletTokenModel,
};

export default [
  TestModel,
  WalletModel,
  GuideSettingsModel,
  TokenModel,
  WalletTokenModel,
];
