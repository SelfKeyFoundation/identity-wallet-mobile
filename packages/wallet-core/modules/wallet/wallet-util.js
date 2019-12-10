import { WalletModel } from '../../models';
import { Web3Service } from '@selfkey/blockchain/services/web3-service';

const web3Service = Web3Service.getInstance();

export async function getBalanceById(walletId) {
  const wallet = await WalletModel.getInstance().findById(walletId);
  return getBalanceByAddress(wallet.address);
}

export function getBalanceByAddress(address) {
  return web3Service.getBalanceByAddess(address);
}

export function getTokenBalance(tokenAddress, walletAddress) {
  return web3Service.getTokenBalance(tokenAddress, walletAddress);
}
