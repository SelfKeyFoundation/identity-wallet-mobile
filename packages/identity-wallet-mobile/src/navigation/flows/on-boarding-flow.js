import { createStackNavigator } from 'react-navigation';
import { Routes } from '@selfkey/wallet-core/navigation';
import CreatePasswordScreen from '../../screens/CreatePasswordScreen';
import { stackNavigatorConfig } from '../configs';

export const onBoardingFlow = createStackNavigator({
  [Routes.ON_BOARDING_SETUP_PASSWORD]: CreatePasswordScreen,
}, stackNavigatorConfig);
