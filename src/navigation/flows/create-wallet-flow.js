// import { createStackNavigator } from 'react-navigation';
import { Routes } from 'core/navigation';
import CreatePasswordScreen from '../../screens/CreatePasswordScreen';
import ConfirmPasswordScreen from '../../screens/ConfirmPasswordScreen';
import BackupWalletScreen from '../../screens/BackupWalletScreen';
import ConfirmMnemonicScreen from '../../screens/ConfirmMnemonicScreen';
import SetupCompleteScreen from '../../screens/SetupCompleteScreen';
import ImportWalletBackupScreen from '../../screens/ImportWalletBackupScreen';
import ImportFromDesktopScreen from '../../screens/ImportFromDesktopScreen';
import ImportFromSeedScreen from '../../screens/ImportFromSeedScreen';

export const createWalletFlow = {
  [Routes.CREATE_WALLET_PASSWORD]: CreatePasswordScreen,
  [Routes.CREATE_WALLET_CONFIRM_PASSWORD]: ConfirmPasswordScreen,
  [Routes.CREATE_WALLET_BACKUP]: BackupWalletScreen,
  [Routes.CREATE_WALLET_CONFIRM_MNEMONIC]: ConfirmMnemonicScreen,
  [Routes.CREATE_WALLET_SETUP_COMPLETE]: SetupCompleteScreen,
  [Routes.CREATE_WALLET_IMPORT_BACKUP]: ImportWalletBackupScreen,
  [Routes.CREATE_WALLET_IMPORT_FROM_DESKTOP]: ImportFromDesktopScreen,
  [Routes.CREATE_WALLET_IMPORT_FROM_SEED]: ImportFromSeedScreen,
};
