
const URL = 'https://ethgasstation.info/json/ethgasAPI.json';

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
}

export default EthGasStationService;
