import { RepositoryModel, IdAttributeTypeModel, UISchemaModel, IdAttributeModel, IdentityModel } from "../../models";

export class IdentityService {
  static loadRepositories() {
		// TODO: Find all for current env
		return RepositoryModel.getInstance().findAll();
	}

	static updateRepositories(repos, isLocal) {
		return Promise.all(repos.map(repo => RepositoryModel.getInstance().addRemoteRepo(repo.url, isLocal)));
	}

	static getExpiredRepositories() {
		let now = Date.now();
		return IdentityService.loadRepositories().filter(repo => repo.expires <= now);
	}

	static loadIdAttributeTypes() {
		// TODO: Find all for current env
		return IdAttributeTypeModel.getInstance().findAll();
	}

	static updateIdAttributeTypes(idAttributeTypes, isLocal) {
		return Promise.all(idAttributeTypes.map(type => IdAttributeTypeModel.getInstance().addRemote(type.url, isLocal)));
	}

	static loadUISchemas() {
		return UISchemaModel.getInstance().findAll();
	}

	static async loadIdentities(walletId) {
		const idModel = IdentityModel.getInstance();
		const identities = await idModel.findAllByWalletId(walletId);

		if (!identities.length) {
			const item = await idModel.create({
				id: await idModel.generateId(),
				walletId,
			});

			identities.push(item);
		}

		return identities;
	}

	static createIdAttribute(attribute) {
		const model = IdAttributeModel.getInstance();
		// let documents = (attribute.documents || []).map(doc => {
		// 	doc = { ...doc };
		// 	if (doc.content) {
		// 		doc.buffer = bufferFromDataUrl(doc.content);
		// 		delete doc.content;
		// 	}
		// 	return doc;
		// });

		return model.create({
			id: model.generateId(),
			...attribute,
		});
	}

	static updateUISchemas(schemas, isLocal) {
		const uiSchemaModel = UISchemaModel.getInstance();

		return Promise.all(
			schemas.map(async schema => {
				try {
					let res = await uiSchemaModel.addRemote(
						schema.url,
						schema.repositoryId,
						schema.attributeTypeId,
						isLocal
					);
					return res;
				} catch (error) {
					console.error(error);
					log.error(`${schema.url}, ${error}`);
				}
				return null;
			})
		);
	}

	static loadIdAttributes(identityId) {
		return IdAttributeModel.getInstance().findAllByIdentityId(identityId)
	}

	static removeIdAttribute(attributeId) {
		return IdAttributeModel.getInstance().removeById(attributeId);
	}

	static editIdAttribute(attribute) {
		if (attribute.documents) {
			attribute = {
				...attribute,
				documents: attribute.documents.map(doc => {
					doc = { ...doc };
					if (doc.content) {
						doc.buffer = bufferFromDataUrl(doc.content);
						delete doc.content;
					}
					return doc;
				}),
			};
		}

		return IdAttributeModel.getInstance().updateById(attribute.id, attribute);
	}

	static async updateIdentitySetup(isSetupFinished, id) {
		const model = IdentityModel.getInstance();
		await model.updateById(id, { isSetupFinished });
		return model.findById(id);
	}

	static updateIdentityName(name, id) {
		// return Identity.updateName({ id, name });
		throw 'Method not implemented';
	}

	static updateIdentityDID(id, did) {
		// return Identity.updateName({ id, name });
		return IdentityModel.getInstance().updateById(id, {
			did
		})
	}

	static async updateIdentityProfilePicture(profilePicture, id) {
		await IdentityModel.getInstance().updateById(id, {
			profilePicture,
		});

		return IdentityModel.getInstance().findById(id);
		// throw 'Method not implemented';
	}

	// updateIdentityDID(did, id) {
	// 	did = did.replace('did:selfkey:', '');
	// 	return Identity.updateDID({ did, id });
	// }

	// createIdentity(identity) {
	// 	return Identity.create(identity);
	// }

	// deleteIdentity(identityId) {
	// 	return Identity.delete(identityId);
	// }

	// updateIdentity(identity) {
	// 	return Identity.update(identity);
	// }
}