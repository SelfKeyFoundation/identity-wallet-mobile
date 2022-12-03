import { Routes } from 'core/navigation';
import UnlockWalletScreen from '../../screens/UnlockWalletScreen';
import ChooseDifferentWalletScreen from '../../screens/ChooseDifferentWalletScreen';
import ImportWalletBackupScreen from '../../screens/ImportWalletBackupScreen';
import WalletSelectionScreen from '../../screens/WalletSelectionScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';

export const unlockWalletFlow = {
  [Routes.UNLOCK_WALLET_PASSWORD]: UnlockWalletScreen,
  [Routes.CHOOSE_DIFFERENT_WALLET]: ChooseDifferentWalletScreen,
  [Routes.WALLET_SELECTION]: WalletSelectionScreen,
  [Routes.UNLOCK_WALLET_FORGOT_PASSWORD]: ForgotPasswordScreen
};
