import { Web3Service } from 'blockchain/services/web3-service';

export async function unlockWalletWithPrivateKey(privateKey) {
  const account = Web3Service.getInstance().privateKeyToAccount(privateKey);
  Web3Service.getInstance().setDefaultAccount(account);
}
