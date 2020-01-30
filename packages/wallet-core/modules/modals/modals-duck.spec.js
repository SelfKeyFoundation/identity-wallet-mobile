import sinon from 'sinon';
import duck from './index';
import actions from './actions';

describe('Modals Duck', () => {
	let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		},
	};

	beforeEach(() => {
		sinon.restore();
		_state = { modals: { ...duck.initialState } };
	});

	describe('Reducers', () => {
		it('showModalReducer', () => {
			const id = 1;
			const params = 2;

			let state = duck.reducers.showModalReducer(
				duck.initialState,
				actions.showModal(id, params),
			);

			expect(state.modalId).toEqual(id);
			expect(state.params).toEqual(params);
		});

		it('hideModalReducer', () => {
			let state = {
				modalId: 1,
				params: 2,
			};

			state = duck.reducers.hideModalReducer(
				state,
				actions.hideModal(),
			);

			expect(state.modalId).toEqual(null);
			expect(state.params).toEqual(null);
		});
	});
});
