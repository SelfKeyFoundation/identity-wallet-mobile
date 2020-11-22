import { getConfigs, isDevMode } from 'configs';
import { ContractModel } from 'core/models';
import { Logger } from 'core/utils/logger';
import _ from 'lodash';
import { SchedulerService } from './scheduler/scheduler-service';
import ethTokens from '../assets/data/eth-tokens.json'
// import config from 'common/config';
// import Contract from './contract';
// import request from 'request-promise-native';
// import { isDevMode } from 'common/utils/common';
// import { Logger } from '../../../common/logger';
// import { CONTRACTS_SYNC_JOB, CONTRACTS_SYNC_JOB_INTERVAL } from './contracts-sync-job-handler';
// import { ExponentialBackoffRetryStrategy, IntervalStrategy } from '../../scheduler/strategies';

const log = new Logger('ContractsService');

export function getKEYContractAddress() {
	return isDevMode() ? ethTokens[1].address : ethTokens[0].address;
}

export const getContractApiEndpoint = () => {
  return `${getConfigs().airtableBaseUrl}Contracts${isDevMode() ? 'Dev' : ''}`
}

export class ContractService {
	constructor({ schedulerService }) {
		this.schedulerService = schedulerService;
  }
  
  static getInstance(): ContractService {
    if (!ContractService._instance) {
      ContractService._instance = new ContractService({
        schedulerService: SchedulerService.getInstance(),
      });
    }

    return ContractService._instance;
  }

	async fetch() {
		try {
      let fetched = await fetch(getContractApiEndpoint()).then(res => res.json());      
			return fetched.entities.map(entity => {
				let item = _.mapKeys(entity.data, (value, key) => _.camelCase(key));
				try {
					item.abi = JSON.parse(item.abi);
					if (typeof item.abi !== 'object') {
						item.abi = {};
					}
				} catch (error) {
					item.abi = {};
				}

				try {
					item.config = JSON.parse(item.config);
					if (typeof item.config !== 'object') {
						item.config = {};
					}
				} catch (error) {
					item.config = {};
				}

				return item;
			});
		} catch (error) {
			log.error(error);
			throw error;
		}
	}
	start() {
		this.schedulerService.queueJob(null, CONTRACTS_SYNC_JOB, 0, null, {
			success: {
				name: IntervalStrategy.NAME,
				interval: CONTRACTS_SYNC_JOB_INTERVAL
			},
			error: {
				name: ExponentialBackoffRetryStrategy.NAME,
				attempts: 5
			}
		});
	}

	findByType(type) {
		return ContractModel.getInstance().find('type = $0', type);
	}

	loadContracts() {
		return ContractModel.getInstance().findAll();
	}
	upsert(upsert) {
		return ContractModel.getInstance().addOrUpdate(upsert);
	}
	deleteMany(ids) {
		return ids.map(id => {
			return ContractModel.getInstance().removeById(id);
		});
	}
}
