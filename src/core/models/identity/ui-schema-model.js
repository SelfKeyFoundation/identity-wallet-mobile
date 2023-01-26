import { Logger } from 'core/utils/logger';
import { getCurrentEnv } from 'configs';
import { BaseModel } from '../common/base-model';
import * as jsonSchema from '../../modules/identity/json-schema-utils';

const log = new Logger('ui-schema-model');

const UI_SCHEMA_EXPIRES = 86400000; // 1 day

export class UISchemaModel extends BaseModel {
  static instance: UISchemaModel;

  static schema = {
    name: 'UISchema',
    primaryKey: 'id',
    properties: {
      id: 'int',
      url: 'string',
      repositoryId: 'int',
      attributeTypeId: 'int',
      content: 'string?',
      expires: 'int?',
      env: 'string?',
      updatedAt: 'date?',
      createdAt: 'date?',
      // id: { type: 'integer' },
      // url: { type: 'string' },
      // repositoryId: { type: 'integer' },
      // attributeTypeId: { type: 'integer' },
      // content: { type: 'object' },
      // expires: { type: 'integer' },
      // env: { type: 'string', enum: ['production', 'development'], default: env }
    },
  };

  static getInstance() {
    if (!UISchemaModel.instance) {
      UISchemaModel.instance = new UISchemaModel();
    }

    return UISchemaModel.instance;
  }

  constructor() {
    super(UISchemaModel.schema);
  }

  findByUrl(url, repoId) {
    return this.findOne(item => item.url === url && item.repositoryId === repoId);
  }

  applyCustomMapping(item) {
    // item.content = typeof item.content === 'string' ? JSON.parse(item.content) : item.content || {};
    return item;
  }

  beforeCreate(item) {
    // if (typeof item.content === 'object') {
    //   item.content = JSON.stringify(item.content);
    // }

    item.createdAt = new Date();
    item.updatedAt = item.createdAt;

    return item;
  }

  beforeUpdate(item) {
    // if (typeof item.content === 'object') {
    //   item.content = JSON.stringify(item.content);
    // }

    item.updatedAt = new Date();

    return item;
  }

  async loadRemote(url, isLocal) {
    const env = getCurrentEnv();
		const remote = await jsonSchema.loadRemoteSchema(url, { env, isLocal });

		let remoteSchema = {
			url,
			content: remote,
			expires: Date.now() + (remote.expires || UI_SCHEMA_EXPIRES)
		};

		return remoteSchema;
	}

	async addRemote(url, repositoryId, attributeTypeId, isLocal) {
		let [remote, attrType] = await Promise.all([
			this.loadRemote(url, isLocal),
			this.findByUrl(url, repositoryId)
    ]);

		if (!remote) {
			log.error(`could not load ui schema ${url} from remote`);
			return;
    }

		remote.repositoryId = repositoryId;
		remote.attributeTypeId = attributeTypeId;

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
			log.error(error);
			throw error;
		}
	}
}
