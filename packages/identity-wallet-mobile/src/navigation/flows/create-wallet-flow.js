import { createStackNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import CreatePasswordScreen from '../../screens/CreatePasswordScreen';
import ConfirmPasswordScreen from '../../screens/ConfirmPasswordScreen';
import BackupWalletScreen from '../../screens/BackupWalletScreen';
import SetupCompleteScreen from '../../screens/SetupCompleteScreen';

import { stackNavigatorConfig } from '../configs';

export const createWalletFlow = createStackNavigator({
  [Routes.CREATE_WALLET_PASSWORD]: CreatePasswordScreen,
  [Routes.CREATE_WALLET_CONFIRM_PASSWORD]: ConfirmPasswordScreen,
  [Routes.CREATE_WALLET_BACKUP]: BackupWalletScreen,
  [Routes.CREATE_WALLET_SETUP_COMPLETE]: SetupCompleteScreen,
}, stackNavigatorConfig);
