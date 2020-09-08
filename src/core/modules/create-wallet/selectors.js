export const createWalletRoot = state => state.createWallet;
export const getPassword = state => createWalletRoot(state).password;
export const getMnemonicPhrase = state => createWalletRoot(state).mnemonicPhrase || '';
export const getMnemonicConfirmation = state => createWalletRoot(state).mnemonicConfirmation || [];
export const getShuffledMnemonic = state => createWalletRoot(state).shuffledMnemonic || '';
export const getConfirmationError = state => createWalletRoot(state).confirmationError;

