import * as Keychain from 'react-native-keychain';

export * from 'react-native-keychain';

/**
 * Add data into the keychain
 *
 * @param {*} id
 * @param {*} data
 * @param {*} options
 */
export function setItem(id: string, data: any, options: Keychain.Options = {}) {
  const jsonData = JSON.stringify(data);

  options.service = id;

  return Keychain.setGenericPassword(jsonData, data.password || 'password', options);
}

/**
 * Remove data from the keychain
 *
 * @param {*} id
 */
export function removeItem(id: string) {
  return Keychain.resetGenericPassword({
    service: id,
  });
}

/**
 * Get data from the keychain
 * @param {*} id
 */
export async function getItem(id: string, options = {}): any {
  const result = await Keychain.getGenericPassword({ service: id, ...options });

  if (!result) {
    return;
  }

  const data = JSON.parse(result.username);

  return data;
}

export const BiometryTipes = {
  TOUCH_ID: 'TouchID',
  FACE_ID: 'FaceID',
  FINGERPRINT: 'Fingerprint',
};

/**
 * Values:
 * 
 */
export function getSupportedBiometryType() {
  return Keychain.getSupportedBiometryType();
}

// getItem('test').then((data) => {
//   // console.log(data);
//   debugger;
// }).catch(err => {
//   // console.log(err);
//   debugger;
// })

// Keychain.setGenericPassword('test', 'test2', {
//   accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
//   service: 'testing'
// }).then(result => {
//   // console.log(result);
//   Keychain.getGenericPassword({
//     service: 'testing',
//     // accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
//     // authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS
//     authenticationPrompt: 'Unlock your selfkey wallet',
//   }).then(data => {
//     console.log(data);
//   });  
// });
// https://github.com/SelfKeyFoundation/identity-wallet-mobile/commit/95ac1e01db156a2854195b5b51b77eb89f755c61
