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
export async function getItem(id: string): any {
  const result = await Keychain.getGenericPassword({ service: id });

  if (!result) {
    return;
  }

  const data = JSON.parse(result.username);

  return data;
}
