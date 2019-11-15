import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';
import actions from './actions';
import * as selectors from './selectors';
import { createVault } from '../../identity-vault';
import { navigate, Routes } from '../../navigation';
import { WalletModel } from '../../models';

const submitPasswordOperation = (form) => async (dispatch, getState) => {
  dispatch(actions.setPassword(form.password));
  await navigate(Routes.CREATE_WALLET_CONFIRM_PASSWORD);
};

const submitPasswordConfirmationOperation = (form) => async (dispatch, getState) => {
  await dispatch(generateMnemonic());
  await navigate(Routes.CREATE_WALLET_BACKUP);
};

const submitWalletBackup = (form) => async (dispatch, getState) => {
  await dispatch(setupWallet());
  await navigate(Routes.APP_DASHBOARD);
};

const setupWallet = (form) => async (dispatch, getState) => {
  const state = getState();
  const mnemonic = selectors.getMnemonicPhrase(state);
  const builder = await WalletBuilder.createFromMnemonic(mnemonic);

  const { xpriv, xpub } = builder.toJSON();

  const vault = await createVault({
    privateKey: xpriv,
    publicKey: xpub,
    password: state.createWallet.password,
    securityPolicy: {
      password: true,
      faceId: false,
      fingerprint: false,
    },
  });

  const path = builder.getETHPath(0);
  const wallet = builder.createWallet(path);

  // TODO: Create singleton for getting model
  const walletModel = new WalletModel();

  await walletModel.create({
    address: wallet.address,
    name: 'SelfKey Wallet',
    vaultId: vault.id,
    type: 'hd',
    path: path,
  });
};

const generateMnemonic = () => async (dispatch, getState) => {
  const mnemonic = WalletBuilder.generateMnemonic();
  dispatch(actions.setMnemonicPhrase(mnemonic));
};

export const operations = {
  submitPasswordOperation,
  submitPasswordConfirmationOperation,
  setupWallet,
  submitWalletBackup,
};

export const createWalletOperations = {
  ...actions,
  ...operations,
};

export default createWalletOperations;
