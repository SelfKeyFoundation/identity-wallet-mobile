import { WalletModel } from './wallet/wallet-model';
import { TestModel } from './common/test-model';

export const CURRENT_SCHEMA_VERSION = 1;
export const SCHEMA_NAME = 'init';

export {
  WalletModel,
  TestModel,
};

export default [
  TestModel,
  WalletModel,
];

