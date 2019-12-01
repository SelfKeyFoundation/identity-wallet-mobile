let system;

export const setSystemImpl = (impl) => {
  system = impl;
};

/**
 * Close the application
 */
export const exitApp = () => system.exitApp();
