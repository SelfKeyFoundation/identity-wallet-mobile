import { WalletModel } from './wallet/wallet-model';
import { TestModel } from './common/test-model';
import { TokenModel } from './token/token-model';
import { WalletTokenModel } from './wallet-token/wallet-token-model';
import { GuideSettingsModel } from './guide-settings/guide-settings-model';
import { TxHistoryModel } from './tx-history/tx-history-model';

export const CURRENT_SCHEMA_VERSION = 3;
export const SCHEMA_NAME = 'wallet-updates-2';

export {
  WalletModel,
  TestModel,
  GuideSettingsModel,
  TokenModel,
  WalletTokenModel,
  TxHistoryModel,
};

export default [
  TestModel,
  WalletModel,
  GuideSettingsModel,
  TokenModel,
  WalletTokenModel,
  TxHistoryModel,
];
