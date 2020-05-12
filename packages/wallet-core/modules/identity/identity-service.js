import { RepositoryModel, IdAttributeTypeModel, UISchemaModel, IdAttributeModel } from "../../models";

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

	static updateUISchemas(idAttributeTypes) {
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
					log.error(`${schema.url}, ${error}`);
				}
				return null;
			})
		);
	}

	static loadIdAttributes(identityId) {
		// return IdAttributeModel.getInstance().findAllByIdentityId(identityId)
	}
}