import { initDatabase } from './test-setup';
import { createEnhancedStore } from '../redux/store';
import { getModels } from '../db/realm-service';
import ducks from '../modules';
import { Web3Service } from 'blockchain/services/web3-service';
import { WalletBuilder } from 'blockchain/util/wallet-builder';

const store = createEnhancedStore();

async function start() {
  console.log('initializing db');
  await initDatabase();
  console.log('db loaded');

  // Unlock wallet
  await store.dispatch(
    ducks.unlockWallet.operations.submitUnlockOperation({ password: 'test' })
  );

  console.log('unlock done');

  // Go to transaction
  await store.dispatch(
    ducks.transaction.operations.goToTransactionOperation('eth')
  );

  console.log('go to transaction done');

  // set address
  await store.dispatch(
    ducks.transaction.operations.setAddress('0xDF8e950e8b90bA07Cc104C70BA28E5812f75A042')
  )

  await store.dispatch(
    ducks.transaction.operations.setAmount('0.000001')
  )

  console.log(store.getState())

  await store.dispatch(
    ducks.transaction.operations.sendTransaction()
  );

  // Get tx history
}

// async function testGasEtimate() {
//   const web3Service = Web3Service.getInstance();
//   const contractAddress = '0xcfec6722f119240b97effd5afe04c8a97caa02ee';
//   const tokenContract = web3Service.web3.eth.Contract(
//     web3Service.contractABI,
//     contractAddress
//   );
//   const address = '0xDF8e950e8b90bA07Cc104C70BA28E5812f75A042';
//   const from = '0xe66CB2767a9C1726A1B86d44C031254aa143af7a';
//   const amount = '0.000001';
//   const amountInWei = web3Service.web3.utils.toWei(amount);

//   const estimate = await tokenContract.methods
//     .transfer(address, amountInWei)
//     .estimateGas({ from });

//   console.log(estimate);
// }

async function testDid() {
  // 
  // const contractAddress = '0xcfec6722f119240b97effd5afe04c8a97caa02ee';
  // const tokenContract = web3Service.web3.eth.Contract(
  //   web3Service.contractABI,
  //   contractAddress
  // );
  // const address = '0xDF8e950e8b90bA07Cc104C70BA28E5812f75A042';
  // const from = '0xe66CB2767a9C1726A1B86d44C031254aa143af7a';
  // const amount = '0.000001';
  // const amountInWei = web3Service.web3.utils.toWei(amount);

  // const estimate = await tokenContract.methods
  //   .transfer(address, amountInWei)
  //   .estimateGas({ from });

  // console.log(estimate);
  const mnemonic = WalletBuilder.generateMnemonic();

  console.log(mnemonic);
  // const walletBuilder = WalletBuilder.createFromMnemonic()

  // const web3Service = Web3Service.getInstance();
}

// testGasEtimate();
// start();
testDid();