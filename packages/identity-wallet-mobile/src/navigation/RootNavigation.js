import { createSwitchNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import { loadingFlow } from './flows/loading-flow';
import { onBoardingFlow } from './flows/on-boarding-flow';
import { appFlow } from './flows/app-flow';

export const RootNavigation = createSwitchNavigator({
  [Routes.LOADING_FLOW]: loadingFlow,
  [Routes.ON_BOARDING_FLOW]: onBoardingFlow,
  [Routes.APP_FLOW]: appFlow,
});
