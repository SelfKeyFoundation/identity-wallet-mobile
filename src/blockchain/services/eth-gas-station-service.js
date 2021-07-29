import EthUnits from "blockchain/util/eth-units";
import { Web3Service } from "./web3-service";

const URL = 'https://ethgasstation.info/json/ethgasAPI.json';
const EIP_1559 = 'https://gas-api.metaswap.codefi.network/networks/3/suggestedGasFees';
export class EthGasStationService {
  static _instance: EthGasStationService;

	async getInfo() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch(err) {
      console.error(err);
      return err;
    }
  }

  static getInstance() {
    if (!EthGasStationService._instance) {
      EthGasStationService._instance = new EthGasStationService();
    }

    return EthGasStationService._instance;
  }
  
  async getPrice(type = 'average') {
    const priceInfo = await this.getInfo();
    const amount = priceInfo[type];
    return EthUnits.unitToUnit(amount, 'mwei', 'wei')
  }
  
  async getEIP_1559Fees() {
    const response = await fetch(EIP_1559);
    return response.json();
  }
  
  async getEthFee(gasLimit, priceType = 'average') {
    const priceInfo = await this.getInfo();
    const gasPriceInWei = EthUnits.unitToUnit(priceInfo[priceType], 'mwei', 'wei');
    const feeInWei = String(Math.round(gasPriceInWei * gasLimit));
    const feeInEth = Web3Service.getInstance().web3.utils.fromWei(
      feeInWei,
      'ether'
    );

    return parseFloat(feeInEth);
  }
}

export default EthGasStationService;
