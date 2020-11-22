import schedulerTypes from './types';

export const schedulerActions = {
  queueJobAction: (id, category, at = 0, data, strategy = null) => ({
		type: schedulerTypes.SCHEDULER_JOB_QUEUE,
		payload: {
			id: id || uuidv1(),
			category,
			at,
			data,
			strategy
		}
	}),
	processJobAction: (id, processTs) => ({
		type: schedulerTypes.SCHEDULER_JOB_PROCESS,
		payload: { id, processTs }
	}),
	finishJobAction: (id, category, finishTs, finishStatus, result, data) => ({
		type: schedulerTypes.SCHEDULER_JOB_FINISH,
		payload: { id, category, finishStatus, result, finishTs, data }
	}),
	progressJobAction: (id, progressTs, progress, data) => ({
		type: schedulerTypes.SCHEDULER_JOB_PROGRESS,
		payload: { id, progressTs, progress, data }
	}),
	cancelJobAction: (id, category, finishTs, result, data) => ({
		type: schedulerTypes.SCHEDULER_JOB_FINISH,
		payload: { id, category, finishTs, finishStatus: 'canceled', result, data }
	}),
	deleteJobAction: id => ({
		type: schedulerTypes.SCHEDULER_JOB_DELETE,
		payload: id
	}),
	setProcessingQueueAction: processing => ({
		type: schedulerTypes.SCHEDULER_QUEUE_SET_PROCESSING,
		payload: processing
	}),
	setConfigQueueAction: config => ({
		type: schedulerTypes.SCHEDULER_QUEUE_SET_CONFIG,
		payload: config
	})
};

export default schedulerActions;


