let System;

export const setSystemImpl = (impl) => {
  System = impl;
};

/**
 * Close the application
 */
export const exitApp = () => System.exitApp();

export { System };
