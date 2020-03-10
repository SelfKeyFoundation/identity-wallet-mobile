import { Web3Service } from '@selfkey/blockchain/services/web3-service';
import { abi as customSymbolABI } from '../assets/data/abi-custom-symbol.json';


export async function getGasLimit({ contractAddress, address, amount, from }) {
  const tokenContract = Web3Service.getInstance().web3.eth.Contract(
    Web3Service.getInstance().contractABI,
    contractAddress
  );
  const MAX_GAS = 4500000;
  const amountInWei = Web3Service.getInstance().web3.utils.toWei(amount);
  const estimate = await tokenContract.methods
    .transfer(address, amountInWei)
    .estimateGas({ from });

  return Math.round(Math.min(estimate * 1.1, MAX_GAS));
}

export async function getTokenInfo(contractAddress) {
  let tokenContract = new Web3Service.getInstance().web3.eth.Contract(
    Web3Service.getInstance().contractABI,
    contractAddress
  );

  const decimal = parseInt(await tokenContract.methods.decimals().call());
  let symbol = '';
  let name = '';

  try {
    symbol = await tokenContract.methods.symbol().call();
    name = await tokenContract.methods.name().call();

    debugger;
  } catch (error) {
    if (error.message.indexOf('Number can only safely store up to 53 bits') !== -1) {
      tokenContract = new Web3Service.getInstance().web3.eth.Contract(
        customSymbolABI,
        contractAddress
      );
      symbol = Web3Service.getInstance().web3.utils.hexToAscii(
        await tokenContract.methods.symbol().call()
      );

      name = Web3Service.getInstance().web3.utils.hexToAscii(
        await tokenContract.methods.name().call()
      );
    }
  }

  return {
    address: contractAddress,
    symbol,
    decimal,
    name,
  };
}