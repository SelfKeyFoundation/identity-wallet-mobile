import { createSwitchNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import { loadingFlow } from './flows/loading-flow';
import { createWalletFlow } from './flows/create-wallet-flow';
import { unlockWalletFlow } from './flows/unlock-wallet-flow';
import { appFlow } from './flows/app-flow';

export const RootNavigation = createSwitchNavigator({
  [Routes.LOADING_FLOW]: loadingFlow,
  [Routes.CREATE_WALLET_FLOW]: createWalletFlow,
  [Routes.APP_FLOW]: appFlow,
  [Routes.UNLOCK_WALLET_FLOW]: unlockWalletFlow,
});
