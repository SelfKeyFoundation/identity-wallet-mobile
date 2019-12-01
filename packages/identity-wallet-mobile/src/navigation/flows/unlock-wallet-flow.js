import { createStackNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import UnlockWalletScreen from '../../screens/UnlockWalletScreen';

import { stackNavigatorConfig } from '../configs';

export const unlockWalletFlow = createStackNavigator({
  [Routes.UNLOCK_WALLET_PASSWORD]: UnlockWalletScreen,
}, stackNavigatorConfig);
