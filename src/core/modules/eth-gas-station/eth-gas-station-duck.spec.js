import sinon from 'sinon';
import duck from './index';

const { selectors, actions } = duck;

describe('ETH Gas Station Duck', () => {
  let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		}
  };

  beforeEach(() => {
    sinon.restore();
    _state = {
      ethGasStation: { ...duck.initialState },
    };
  })

  describe('Selectors', () => {
    it('getEthGasStationInfo', () => {
      const state = {
        ethGasStation: {
          safeLow: 100,
          average: 110,
          fast: 120,
        }
      };

      const result = selectors.getEthGasStationInfo(state);

      expect(result.safeLow).toBeDefined();
      expect(result.fast).toBeDefined();
      expect(result.average).toBeDefined();
    });

    it('getEthGasStationInfoWEI', () => {
      const state = {
        ethGasStation: {
          safeLow: 100,
          average: 110,
          fast: 120,
        }
      };

      const result = selectors.getEthGasStationInfoWEI(state);

      expect(result.safeLow).toBeDefined();
      expect(result.fast).toBeDefined();
      expect(result.average).toBeDefined();
    });
  });

  describe('Reducers', () => {
    it('updateData', () => {
      const value = {
        safeLow: 100,
        average: 110,
        fast: 120,
      };

      let state = duck.reducers.updateDataReducer(
        duck.initialState,
        duck.actions.updateData(value)
      );

      expect(state).toEqual({
        safeLow: 10,
        average: 11,
        fast: 12, 
      });
    });
  });
  // describe('Operations', () => {
  
  // });
});
