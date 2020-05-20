import { RepositoryModel, IdAttributeTypeModel, UISchemaModel, IdAttributeModel, IdentityModel } from "../../models";

export class IdentityService {
  static loadRepositories() {
		// TODO: Find all for current env
		return RepositoryModel.getInstance().findAll();
	}

	static updateRepositories(repos) {
		return Promise.all(repos.map(repo => RepositoryModel.getInstance().addRemoteRepo(repo.url)));
	}

	static getExpiredRepositories() {
		let now = Date.now();
		return IdentityService.loadRepositories().filter(repo => repo.expires <= now);
	}

	static loadIdAttributeTypes() {
		// TODO: Find all for current env
		return IdAttributeTypeModel.getInstance().findAll();
	}

	static updateIdAttributeTypes(idAttributeTypes) {
		return Promise.all(idAttributeTypes.map(type => IdAttributeTypeModel.getInstance().addRemote(type.url)));
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

	static updateUISchemas(schemas) {
		const uiSchemaModel = UISchemaModel.getInstance();

		return Promise.all(
			schemas.map(async schema => {
				try {
					let res = await uiSchemaModel.addRemote(
						schema.url,
						schema.repositoryId,
						schema.attributeTypeId
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

	// removeIdAttribute(attributeId) {
	// 	return IdAttribute.delete(attributeId);
	// }

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

	static updateIdentityProfilePicture(profilePicture, id) {
		// return Identity.updateProfilePicture({ id, profilePicture });
		throw 'Method not implemented';
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