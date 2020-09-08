import { BaseModel } from '../common/base-model';
import * as jsonSchema from '../../modules/identity/json-schema-utils';
import { RepositoryModel } from './repository-model';
import { getCurrentEnv } from '@selfkey/configs';
import { Logger } from 'core/utils/logger';

const log = new Logger('id-attribute-model');

const ID_ATTRIBUTE_TYPE_EXPIRES = 86400000; // 1 day

export class IdAttributeTypeModel extends BaseModel {
  static instance: IdAttributeTypeModel;

  static schema = {
    name: 'IdAttributeType',
    primaryKey: 'id',
    properties: {
      id: 'int',
      url: 'string',
      defaultRepositoryId: 'int?',
      content: 'string?',
      expires: 'int?',      
			env: 'string?',
			updatedAt: 'date?',
      createdAt: 'date?',
      // id: { type: 'integer' },
      // url: { type: 'string' },
      // defaultRepositoryId: { type: 'integer' },
      // content: { type: 'object' },
      // expires: { type: 'integer' },
      // env: { type: 'string', enum: ['production', 'development'], default: env } 
    },
	};
	
	applyCustomMapping(item) {
    item.content = item.content ? JSON.parse(item.content) : {};
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

  static getInstance() {
    if (!IdAttributeTypeModel.instance) {
      IdAttributeTypeModel.instance = new IdAttributeTypeModel();
    }

    return IdAttributeTypeModel.instance;
  }

  constructor() {
    super(IdAttributeTypeModel.schema);
  }

  findByUrl(url) {
    return this.findOne('url = $0', url); 
  }

  async loadRemote(url, isLocal) {
		const repositoryModel = RepositoryModel.getInstance();
		const env = getCurrentEnv();

		let defaultRepo = null;
		let remote = await jsonSchema.loadRemoteSchema(url, { env, isLocal });
		remote = await jsonSchema.dereference(remote, { env });
		let repoUrl = jsonSchema.getDefaultRepo(remote, { env });
		if (repoUrl) {
			defaultRepo = await repositoryModel.findByUrl(repoUrl);
			if (!defaultRepo) {
				defaultRepo = await repositoryModel.addRemoteRepo(repoUrl);
			}
		}
		let remoteAttrType = {
			url,
			content: remote,
			expires: Date.now() + (remote.expires || ID_ATTRIBUTE_TYPE_EXPIRES)
		};
		if (defaultRepo) remoteAttrType.defaultRepositoryId = defaultRepo.id;
		return remoteAttrType;
	}

	async addRemote(url, isLocal ) {
		let [remote, attrType] = await Promise.all([this.loadRemote(url, isLocal), this.findByUrl(url)]);
		if (!remote) {
			log.error(`could not load attribute type ${url} from remote`);
			return;
		}

		try {
			if (!attrType) {
				attrType = await this.create({
					id: this.generateId(),
					...remote,
				});
			} else {
				await this.updateById(attrType.id, remote);
				attrType = this.findById(attrType.id);
			}

			return attrType;
		} catch (error) {
      console.error(error);
			log.error(error);
			throw error;
		}
	}
}
