import { createStackNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';

export const onBoardingFlow = createStackNavigator({
  [Routes.ON_BOARDING_SETUP_PASSWORD]: () => {},
});
