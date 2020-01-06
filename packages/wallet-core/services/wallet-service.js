import { Web3Service } from '@selfkey/blockchain/services/web3-service';

const web3Service = Web3Service.getInstance();

export async function unlockWalletWithPrivateKey(privateKey) {
  const account = web3Service.privateKeyToAccount(privateKey);
  web3Service.setDefaultAccount(account);
}
