import sinon from 'sinon';
import duck from './index';
import actions from './actions';

describe('Create Wallet Duck', () => {
	it('', () => {
		expect(2).toBe(2);
	});
	let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		},
	};
	beforeEach(() => {
		sinon.restore();
		_state = {
			password: undefined,
		};
	});

	describe('Reducers', () => {
		it('setPasswordReducer', () => {
			let state = duck.reducers.setPasswordReducer(
				duck.initialState,
				actions.setPassword('123'),
			);

			expect(state.password).toEqual('123');
		});
	});
	describe('Operations', () => {
		it('importFromDesktopOperation', async () => {
			const keystore = 'eyJ2ZXJzaW9uIjozLCJpZCI6IjJmM2QxNTkxLTNhYjYtNDI3MC05YjYzLWQ5NGUxYWVhZDk2ZSIsImFkZHJlc3MiOiJiNGQ5NjUzYjlkOWZlZjhjZjM0MDdiZmY2ZDIxZGIyNWQ3NGRkZGM2IiwiY3J5cHRvIjp7ImNpcGhlcnRleHQiOiIzOGQzNTA3Zjk5OTY0ZGY3ODc0NGIyMWU1YmNmZTgxZjVlOWEzMDA1YTExMTc1YmFmYmJmZDQ1MWRjMTgxY2ViIiwiY2lwaGVycGFyYW1zIjp7Iml2IjoiZDY1ZTdhMGYyZTVmYjM1NGI0ODQzNDM5MjczMzE2YjEifSwiY2lwaGVyIjoiYWVzLTEyOC1jdHIiLCJrZGYiOiJzY3J5cHQiLCJrZGZwYXJhbXMiOnsiZGtsZW4iOjMyLCJzYWx0IjoiOTkwZWI5NGMyYmE5YzUwMGYwMTYwM2RjZTEwNDIwMGQ1N2EwZGU4NTU4NWY5MWUxYzUwMmJkMjczYTE1YWM1NiIsIm4iOjgxOTIsInIiOjgsInAiOjF9LCJtYWMiOiI0MWEwODFjMjljN2MzNDYzOGU4Zjk5Y2ZlZDU3NGM3YzBmODAzOWU4ZWYyNWRlMGQ5NDc2ZDJjZDJjZmFjMWY5In19';
			const password = 'WALLET';
			await duck.operations.importFromDesktopOperation(keystore, password)(store.dispatch, store.getState);
		});
	});
});
