import { setSystemImpl } from '@selfkey/wallet-core/system';
import RNExitApp from 'react-native-exit-app';

const RNSystem = {
  exitApp() {
    RNExitApp.exitApp();
  },
  // other system methods
};

setSystemImpl(RNSystem);
