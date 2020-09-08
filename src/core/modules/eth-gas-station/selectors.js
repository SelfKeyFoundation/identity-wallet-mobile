const GWEI = 10000000; 

export const getEthGasStationInfo = ({ ethGasStation }) => ethGasStation;
export const getEthGasStationInfoWEI = ({ ethGasStation }) => ({
	average: ethGasStation.average * GWEI,
	fast: ethGasStation.fast * GWEI,
	safeLow: ethGasStation.safeLow * GWEI
});

export const getEthGasStationInfoETH = ({ ethGasStation }) => ({
	average: ethGasStation.average / 1000000000,
	fast: ethGasStation.fast / 1000000000,
	safeLow: ethGasStation.safeLow / 1000000000
});
