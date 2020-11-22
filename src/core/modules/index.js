import wallet from './wallet';
import createWallet from './create-wallet';
import app from './app';
import unlockWallet from './unlock-wallet';
import transaction from './transaction';
import ethGasStation from './eth-gas-station';
import txHistory from './tx-history';
import wallets from './wallets';
import modals from './modals';
import identity from './identity';
import kyc from './kyc';
import scheduler from './scheduler';
import contract from './contract';
import staking from './staking';
import marketplace from '../../screens/marketplaces/mkpSlice';
import walletConnect from '../../screens/walletConnect/walletConnectSlice';

export default {
  wallet,
  app,
  createWallet,
  unlockWallet,
  transaction,
  ethGasStation,
  txHistory,
  wallets,
  modals,
  identity,
  kyc,
  scheduler,
  contract,
  staking,
  marketplace,
  walletConnect,
};
