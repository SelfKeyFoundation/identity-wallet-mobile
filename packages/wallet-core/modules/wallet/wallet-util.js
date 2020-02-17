import { WalletModel } from '../../models';
import { Web3Service } from '@selfkey/blockchain/services/web3-service';

export async function getBalanceById(walletId) {
  const wallet = await WalletModel.getInstance().findById(walletId);
  return getBalanceByAddress(wallet.address);
}

export function getBalanceByAddress(address) {
  return Web3Service.getInstance().getBalanceByAddess(address);
}

export function getTokenBalance(tokenAddress, walletAddress) {
  return Web3Service.getInstance().getTokenBalance(tokenAddress, walletAddress);
}
