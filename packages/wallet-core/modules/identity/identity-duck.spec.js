import sinon from 'sinon';
import duck from './index';
import actions from './actions';
import { identityTypes } from './types';
import { IdentityService } from './identity-service';

describe('Identity Duck', () => {
	let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		},
  };
  const testAction = { test: 'test' };

	beforeEach(() => {
		sinon.restore();
		_state = { identity: { ...duck.initialState } };
	});

	describe('Reducers', () => {

  });

  describe('Identity', () => {
		describe('Operations', () => {
			const testWalletId = 1;
			it('lockIdentityOperation', async () => {
				_state.identity.currentIdentity = testWalletId;
				_state.identity.identities.push(testWalletId);
				_state.identity.identitiesById[testWalletId] = { id: testWalletId };
				sinon.stub(store, 'dispatch');
				sinon.stub(duck.actions, 'deleteIdAttributes').returns(testAction);
				// sinon.stub(duck.actions, 'deleteDocuments').returns(testAction);
				sinon
					.stub(duck.selectors, 'selectIdentity')
					.returns({ id: testWalletId, rootIdentity: true });

				await duck.operations.lockIdentityOperation(testWalletId)(
					store.dispatch,
					store.getState.bind(store)
				);

				// expect(
				// 	duck.actions.deleteDocumentsAction.calledOnceWith(testWalletId)
				// ).toBeTruthy();
				expect(
					duck.actions.deleteIdAttributes.calledOnceWith(testWalletId)
				).toBeTruthy();
				expect(store.dispatch.callCount).toBe(2);
			});
			it('unlockIdentityOperation', async () => {
				_state.identity.identities.push(testWalletId);
				_state.identity.identitiesById[testWalletId] = { id: testWalletId };
				sinon.stub(duck.operations, 'loadIdAttributesOperation').returns(() => {});
				// sinon.stub(duck.operations, 'loadDocumentsOperation').returns(() => {});
				sinon
					.stub(duck.selectors, 'selectIdentity')
					.returns({ id: 1, rootIdentity: true });

				await duck.operations.unlockIdentityOperation(testWalletId)(
					store.dispatch,
					store.getState.bind(store)
				);

				expect(
					duck.operations.loadIdAttributesOperation.calledOnceWith(testWalletId)
				).toBeTruthy();
				// expect(
				// 	duck.operations.loadDocumentsOperation.calledOnceWith(testWalletId)
				// ).toBeTruthy();
			});
		});
		describe('selectors', () => {
			beforeEach(() => {
				_state.identity.identities = [1, 2];
				_state.identity.identitiesById = {
					1: { id: 1, type: 'individual' },
					2: { id: 2, type: 'individual' },
					3: { id: 3, type: 'individual' }
				};
			});
			it('selectIdentity', () => {
				expect(duck.selectors.selectIdentity(_state)).toBeUndefined();
				expect(
					duck.selectors.selectIdentity(_state, { identityId: 3, type: 'individual' })
				).toEqual({ id: 3, type: 'individual' });
			});

			it('selectBasicAttributes', () => {
				const result = duck.selectors.selectBasicAttributes(_state);
				expect(result).toBeUndefined();
			});
			it('selectIdentity current', () => {
				_state.identity.currentIdentity = 3;
				expect(duck.selectors.selectIdentity(_state)).toEqual({
					id: 3,
					type: 'individual'
				});
			});
		});
	});
	describe('Repositories', () => {
    let now = Date.now();
		let testRepositories = [
			{ id: 1, url: 'repository 1', expires: now + 99999 },
			{ id: 2, url: 'repository 2', expires: now + 99999 },
      { id: 3, url: 'repository 3', expires: now - 99999 },
			{ id: 4, url: 'repository 4', expires: now - 99999 },
		];
		let expiredRepos = testRepositories.filter(repo => repo.expires <= now);

		describe('Operations', () => {
			it('loadIdentityOperation', async () => {
				sinon.stub(duck.operations, 'loadRepositoriesOperation').resolves('ok');
				sinon.stub(duck.operations, 'updateExpiredRepositoriesOperation').resolves('ok');

				await duck.operations.loadIdentityOperation()(
					store.dispatch,
					store.getState.bind(store)
				);

				expect(duck.operations.loadRepositoriesOperation.calledOnce).toBeTruthy();
				// expect(duck.operations.updateExpiredRepositoriesOperation.calledOnce).toBeTruthy();
			});

			it('loadRepositoriesOperation', async () => {
				sinon.stub(IdentityService, 'loadRepositories').resolves(testRepositories);
				sinon.stub(store, 'dispatch');
				sinon.stub(actions, 'setRepositories').returns(testAction);

				await duck.operations.loadRepositoriesOperation()(
					store.dispatch,
					store.getState.bind(store)
				);

				expect(IdentityService.loadRepositories.calledOnce).toBeTruthy();
				expect(store.dispatch.calledOnceWith(testAction)).toBeTruthy();
			});

			it('updateExpiredRepositoriesOperation', async () => {
				sinon.stub(duck.selectors, 'selectExpiredRepositories').returns(expiredRepos);
				sinon.stub(IdentityService, 'updateRepositories').resolves('ok');
				sinon.stub(duck.operations, 'loadRepositoriesOperation').resolves('ok');

				await duck.operations.updateExpiredRepositoriesOperation()(
					store.dispatch,
					store.getState.bind(store)
				);

				expect(duck.selectors.selectExpiredRepositories.calledOnce).toBeTruthy();
				expect(
					IdentityService.updateRepositories.calledOnceWith(expiredRepos)
				).toBeTruthy();

				expect(duck.operations.loadRepositoriesOperation.calledOnce).toBeTruthy();
			});
    });
	});

	describe('IdAttributeTypes', () => {
		let now = Date.now();
		const testIdAttributeTypes = [
			{ id: 1, url: 'test', expires: now - 50000, content: {} },
			{ id: 2, url: 'test1', expires: now + 50000, content: {} },
			{ id: 3, url: 'test2', expires: now - 50000, content: {} }
		];
		let expiredIdAttributeTypes = testIdAttributeTypes.filter(type => type.expires <= now);

		describe('Actions', () => {
			it('setIdAttributeTypesAction', () => {
				expect(duck.actions.setIdAttributeTypes(testIdAttributeTypes)).toEqual({
					type: identityTypes.IDENTITY_ID_ATTRIBUTE_TYPES_SET,
					payload: testIdAttributeTypes
				});
			});
		});
		describe('Reducers', () => {
			it('setIdAttributeTypesReducer', () => {
				let state = {
					idAtrributeTypes: [],
					idAtrributeTypesById: {}
				};
				let newState = duck.reducers.setIdAttributeTypesReducer(
					state,
					duck.actions.setIdAttributeTypes([testIdAttributeTypes[0]])
				);

				expect(newState).toEqual({
					idAtrributeTypes: [testIdAttributeTypes[0].id],
					idAtrributeTypesById: {
						[testIdAttributeTypes[0].id]: testIdAttributeTypes[0]
					}
				});
			});
		});
		describe('Selectors', () => {
			beforeEach(() => {
				_state.identity.idAtrributeTypes = testIdAttributeTypes.map(repo => repo.id);
				_state.identity.idAtrributeTypesById = testIdAttributeTypes.reduce((acc, curr) => {
					acc[curr.id] = curr;
					return acc;
				}, {});
			});
			it('selectIdAttributeTypes', () => {
				expect(duck.selectors.selectIdAttributeTypes(_state, 'individual')).toEqual(
					testIdAttributeTypes
				);
			});
			it('selectExpiredIdAttributeTypes', () => {
				// expect(duck.selectors.selectExpiredIdAttributeTypes(_state)).toEqual(
				// 	expiredIdAttributeTypes
				// );
			});
		});
		describe('Operations', () => {
			it('loadIdAttributeTypesOperation', async () => {
				sinon.stub(IdentityService, 'loadIdAttributeTypes').resolves(testIdAttributeTypes);
				sinon.stub(store, 'dispatch');
				sinon.stub(actions, 'setIdAttributeTypes').returns(testAction);

				await duck.operations.loadIdAttributeTypesOperation()(
					store.dispatch,
					store.getState.bind(store)
				);

				expect(IdentityService.loadIdAttributeTypes.calledOnce).toBeTruthy();
				expect(store.dispatch.calledOnceWith(testAction)).toBeTruthy();
			});
		});
	});

	describe('uiSchemas', () => {
		let now = Date.now();
		const testUISchemas = [
			{ id: 1, url: 'test', expires: now - 50000 },
			{ id: 2, url: 'test1', expires: now + 50000 },
			{ id: 3, url: 'test2', expires: now - 50000 }
		];
		let expiredUISchemas = testUISchemas.filter(uiSchema => uiSchema.expires <= now);
		describe('Operations', () => {
			it('loadUISchemasOperation', async () => {
				sinon.stub(IdentityService, 'loadUISchemas').resolves(testUISchemas);
				sinon.stub(store, 'dispatch');
				sinon.stub(actions, 'setUISchemas').returns(testAction);

				await duck.operations.loadUISchemasOperation()(
					store.dispatch,
					store.getState.bind(store)
				);

				expect(IdentityService.loadUISchemas.calledOnce).toBeTruthy();
				expect(store.dispatch.calledOnceWith(testAction)).toBeTruthy();
			});
			it('updateExpiredUISchemasOperation', async () => {
				sinon.stub(duck.selectors, 'selectExpiredUISchemas').returns(expiredUISchemas);
				sinon.stub(IdentityService, 'updateUISchemas').resolves('ok');
				sinon.stub(duck.operations, 'loadUISchemasOperation');

				await duck.operations.updateExpiredUISchemasOperation()(
					store.dispatch,
					store.getState.bind(store)
				);

				expect(duck.selectors.selectExpiredUISchemas.calledOnce).toBeTruthy();
				expect(
					IdentityService.updateUISchemas.calledOnceWith(expiredUISchemas)
				).toBeTruthy();
				expect(duck.operations.loadUISchemasOperation.calledOnce).toBeTruthy();
			});
		});
		describe('Actions', () => {
			it('setUISchemasAction', () => {
				expect(actions.setUISchemas(testUISchemas)).toEqual({
					type: identityTypes.IDENTITY_UI_SCHEMAS_SET,
					payload: testUISchemas
				});
			});
		});
		describe('Reducers', () => {
			it('setUISchemasReducer', () => {
				let state = {
					uiSchemas: [],
					uiSchemasById: {}
				};
				let newState = duck.reducers.setUISchemasReducer(
					state,
					actions.setUISchemas([testUISchemas[0]])
				);

				expect(newState).toEqual({
					uiSchemas: [testUISchemas[0].id],
					uiSchemasById: {
						[testUISchemas[0].id]: testUISchemas[0]
					}
				});
			});
		});
		describe('Selectors', () => {
			beforeEach(() => {
				_state.identity.uiSchemas = testUISchemas.map(repo => repo.id);
				_state.identity.uiSchemasById = testUISchemas.reduce((acc, curr) => {
					acc[curr.id] = curr;
					return acc;
				}, {});
			});
			it('selectUISchemas', () => {
				expect(duck.selectors.selectUISchemas(_state)).toEqual(testUISchemas);
			});
			it('selectExpiredUISchemas', () => {
				// expect(duck.selectors.selectExpiredUISchemas(_state)).toEqual(expiredUISchemas);
			});
		});
	});
});
