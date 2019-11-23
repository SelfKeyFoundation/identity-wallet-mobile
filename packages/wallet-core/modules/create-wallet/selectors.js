export const createWalletRoot = state => state.createWallet;
export const getPassword = state => createWalletRoot(state).password;
export const getMnemonicPhrase = state => createWalletRoot(state).mnemonicPhrase;
