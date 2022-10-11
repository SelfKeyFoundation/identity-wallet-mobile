import DeviceInfo from 'react-native-device-info';

export default {
  "number": `${DeviceInfo.getVersion()} Build ${DeviceInfo.getBuildNumber()}`,
  "env": "prod"
}