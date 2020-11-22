import { SchedulerJob } from './scheduler-job';
import schedulerOperations from 'core/modules/scheduler/operations';
import { Logger } from 'core/utils/logger';

const log = new Logger('SchedulerService');

export class SchedulerService {
	constructor({ store }) {
		this.store = store;
		this.registry = {};
	}
	setStore(store) {
		this.store = store;
	}
	queueJob(id = null, category, at = 0, data, strategy) {
		log.debug('queuing job %s', category);
		this.store.dispatch(schedulerOperations.queueJobAction(id, category, at, data, strategy));
	}
	registerJobHandler(category, handler) {
		log.debug('registering new handler: %s', category);
		this.registry[category] = handler;
	}
	unregisterJobHandler(category) {
		delete this.registry[category];
	}
	initJob(config) {
		if (!this.registry.hasOwnProperty(config.category)) {
			log.error('no handler for category %s', config.category);
			return null;
		}

		return new SchedulerJob(config, this.registry[config.category]);
	}
	static getInstance(): SchedulerService {
		if (!SchedulerService._instance) {
			SchedulerService._instance = new SchedulerService({
				store: null,
			});
		}

		return SchedulerService._instance;
	}
}
