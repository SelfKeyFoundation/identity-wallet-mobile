
const keychain = {};

/**
 * Add data into the keychain
 *
 * @param {*} id
 * @param {*} data
 * @param {*} options
 */
export function setItem(id: string, data: any, options: Keychain.Options = {}) {
  keychain[id] = data;

  return Promise.resolve();
}

/**
 * Remove data from the keychain
 *
 * @param {*} id
 */
export function removeItem(id: string) {
  delete keychain[id];

  return Promise.resolve();
}

/**
 * Get data from the keychain
 * @param {*} id
 */
export async function getItem(id: string): any {
  return Promise.resolve(keychain[id]);
}
