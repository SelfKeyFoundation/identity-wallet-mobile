import { getCurrentEnv } from '@selfkey/configs';
import { BaseModel } from '../common/base-model';
import { Logger } from '@selfkey/wallet-core/utils/logger';
import { loadRemoteRepository, loadLocalRepository } from '../../modules/identity/json-schema-utils';
import { IdAttributeTypeModel, UISchemaModel } from '..';
// import { UiSchema } from './ui-schema';
// import config from 'common/config';
// const env = config.attributeTypeSource;

const log = new Logger('repository-model');

export const REPOSITORY_EXPIRES_DEFAULT = 86400000; // 1 day

export class RepositoryModel extends BaseModel {
  static instance: RepositoryModel;

  static schema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: 'int',
      url: 'string',
      name: 'string?',
      eager: {
        type: 'bool',
        default: false,
      },
      content: 'string',
      expires: 'int?',
      env: 'string?',
      updatedAt: 'date?',
      createdAt: 'date?',
      // id: { type: 'integer' },
      // url: { type: 'string' },
      // name: { type: 'string' },
      // eager: { type: 'boolean', default: false },
      // content: { type: 'object' },
      // expires: { type: 'integer' },
      // env: { type: 'string', enum: ['production', 'development'], default: env }
    }
  };

  static getInstance() {
    if (!RepositoryModel.instance) {
      RepositoryModel.instance = new RepositoryModel();
    }

    return RepositoryModel.instance;
  }

  async loadRemote(url, isLocal) {
		let remoteRepo = await loadRemoteRepository(url, { env: getCurrentEnv(), isLocal });

		return {
			url,
			name: remoteRepo.name,
			content: remoteRepo,
			expires: Date.now() + (remoteRepo.expires || REPOSITORY_EXPIRES_DEFAULT)
		};
	}

  findByUrl(url) {
    return this.findOne('url = $0', url); 
  }

  diffAttributes(remote, local) {
		let incomingAttributes = remote.content.identityAttributes || [];
		let currAttr = local.content.identityAttributes || [];

		let existingMap = currAttr.reduce((acc, curr) => {
			if (typeof curr === 'string') {
				curr = { json: curr };
			}
			if (!curr.json) return;
			acc[curr.json] = curr;
			return acc;
		}, {});

		let updates = incomingAttributes.reduce(
			(acc, curr) => {
				if (typeof curr === 'string') {
					curr = { json: curr };
				}
				if (!curr.json) return acc;

				let existing = existingMap[curr.json];

				if (!existing) {
					acc.add.push(curr);
					return acc;
				}

				if (curr.ui !== existing.ui) {
					if (existing.ui) {
						acc.delete.push({ ui: existing.ui });
					}
					if (curr.ui) {
						acc.add.push(curr);
					}
				}
				delete existingMap[curr.json];
				return acc;
			},
			{
				delete: [],
				add: []
			}
		);
		for (let attr in existingMap) {
			updates.delete.push(existingMap[attr]);
		}
		return updates;
  }

  // TODO
  async addAttribute(attr, repo) {
		if (typeof attr === 'string') {
			attr = { json: attr };
		}

		if (!attr.json) return;


		const idAttributeTypeModel = IdAttributeTypeModel.getInstance();
		
		let attrType = await idAttributeTypeModel.findByUrl(attr.json, repo.id);

		if (!attrType) attrType = await idAttributeTypeModel.create({
			id: idAttributeTypeModel.generateId(),
			url: attr.json,
		});

		// await attrType.$relatedQuery('repositories', tx).relate(this.id);
		if (!attr.ui) return;

		let uiSchemaModel = UISchemaModel.getInstance();
		let uiSchema = await uiSchemaModel.findByUrl(attr.ui, repo.id);
		
		if (uiSchema) return;

		await uiSchemaModel.create(
			{
				id: uiSchemaModel.generateId(),
				url: attr.ui,
				repositoryId: repo.id,
				attributeTypeId: attrType.id
			},
		);
	}

	async deleteAttribute(attr, repo) {
		// throw new Error('method not implemented');
		log.debug('deleting attribute type %j', attr);

		if (attr.ui) {
			let uiSchemaModel = UISchemaModel.getInstance();

			let uiSchema = await uiSchemaModel.findByUrl(attr.ui, repo.id);

			if (uiSchema) {
				await uiSchemaModel.removeById(uiSchema.id);
			}
		}

		if (!attr.json) return;

		let idAttributeTypeModel = IdAttributeTypeModel.getInstance();
		let attrType = await idAttributeTypeModel.findByUrl(attr.json);

		if (!attrType) return;

		await idAttributeTypeModel.removeById(attrType.id);

		// TODO: Implement this logic on IdAttributes BET
		// if (!attrType.repositories.length && !attrType.idAttributes.length)
		// 	await attrType.$query(tx).delete();
  }

  async updateAttributes(updates, repository) {
		for (let attr of updates.delete || []) {
			await this.deleteAttribute(attr, repository);
    }

		for (let attr of updates.add || []) {
			await this.addAttribute(attr, repository);
		}
  }

	async addRemoteRepo(url, isLocal) {
		let [remote, local] = await Promise.all([this.loadRemote(url, isLocal), this.findByUrl(url)]);
		if (!remote) {
			log.error('could not load repo %s from remote', url);
			return;
    }
    
    if (!local) {
      local = await this.create({
        id: await this.generateId(),
        url,
        content: {}
      });
    }

    let updates = this.diffAttributes(remote, local);

    await this.updateAttributes(updates, local);

    await this.updateById(local.id, {
      content: remote.content,
      expires: Date.now() + remote.expires,
      name: remote.name,
    });

    local = this.findById(local.id);
    // repo = await repo.$query(tx).patchAndFetch(remote);
    // await tx.commit();
    return local;
		
  }

  applyCustomMapping(item) {
    item.content = JSON.parse(item.content);
    return item;
  }

  beforeCreate(item) {
    if (typeof item.content === 'object') {
      item.content = JSON.stringify(item.content);
    }

    item.createdAt = new Date();
    item.updatedAt = item.createdAt;

    return item;
  }

  beforeUpdate(item) {
    if (typeof item.content === 'object') {
      item.content = JSON.stringify(item.content);
    }

    item.updatedAt = new Date();

    return item;
  }

  constructor() {
    super(RepositoryModel.schema);
  }
}
