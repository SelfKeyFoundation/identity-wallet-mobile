import DeviceInfo from 'react-native-device-info';
import { isDesktop } from './src/v2/platform-utils';

const envName = 'DEV';
const appVersion = '1.0.1';
const buildNumber = '146';

const mobileVersion = DeviceInfo.getVersion();
const mobileBuild = DeviceInfo.getBuildNumber();

export default {
  "number": `${mobileVersion === 'unknown' ? appVersion : mobileVersion} Build ${buildNumber} - ${envName}`,
  "env": "prod"
};
