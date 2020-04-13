import { setSystemImpl } from '@selfkey/wallet-core/system';
import RNExitApp from 'react-native-exit-app';
import Share from 'react-native-share';
import fs from 'react-native-fs';
import { Platform } from 'react-native'
import crypto from 'crypto';
import { WalletTracker } from  './WalletTracker';

export const RNSystem = {
  exitApp: async () => {
    WalletTracker.trackEvent({
      action: 'closed',
      category: 'app',
      level: 'machine'
    });

    await WalletTracker.flush();

    RNExitApp.exitApp();
  },

  getTracker() {
    return WalletTracker;
  },

  shareFile({
    filePath,
    fileName,
    mimeType
  }) {
    if (Platform.OS === 'ios') {
      return RNSystem._shareFileIOS({ fileName, filePath, mimeType });
    } else {
      return RNSystem._shareFileAndroid({ filePath, filePath, mimeType });
    }
  },

  getCrypto() {
    return crypto;
  },

  getFileSystem() {
    return fs;
  },

  async _shareFileIOS({ fileName, filePath, mimeType}) {
    return Share.open({
      url: `file://${filePath}`,
      type: mimeType,
      filename: fileName
    });
  },

  async _shareFileAndroid({ fileName, filePath, mimeType}) {
    const fileData = await fs.readFile(filePath, 'base64');

    return Share.open({
      url: `data:${mimeType};base64,${fileData}`,
      type: mimeType,
      filename: fileName
    });
  },

};

setSystemImpl(RNSystem);
