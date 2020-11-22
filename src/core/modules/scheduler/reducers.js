
import { createReducer } from '../../redux/reducers';
import schedulerTypes from './types';

export const initialState = {
  processing: false,
	processingJobs: [],
	config: {},
	queue: [],
	finished: [],
	jobsById: {}
};

export const schedulerReducers = {
	setConfigQueueReducer: (state, action) => {
		return { ...state, config: { ...action.payload } };
	},
	setProcessingQueueReducer: (state, action) => {
		return { ...state, processing: !!action.payload };
	},
	queueJobReducer: (state, action) => {
		const job = {
			...action.payload,
			data: { ...action.payload.data }
		};
		const jobsById = { ...state.jobsById };
		const queue = state.queue.filter(id => id !== job.id);
		queue.push(job.id);
		jobsById[job.id] = job;
		return { ...state, queue, jobsById };
	},
	processJobReducer: (state, action) => {
		const { id, processTs } = action.payload;
		if (!state.queue.includes(id)) {
			return state;
		}
		const job = { ...state.jobsById[id], processTs };
		const jobsById = { ...state.jobsById, [id]: job };
		const processingJobs = [...state.processingJobs];
		const queue = state.queue.filter(jobId => jobId !== id);
		processingJobs.push(job.id);
		return { ...state, queue, jobsById, processingJobs };
	},
	finishJobReducer: (state, action) => {
		const { id, finishStatus, result, finishTs } = action.payload;
		let { queue, processingJobs, jobsById, finished } = state;
		if (!queue.includes(id) && !processingJobs.includes(id)) {
			return state;
		}
		const job = {
			...state.jobsById[id],
			finishStatus,
			result: { ...result },
			finishTs
		};
		jobsById = { ...jobsById, [id]: job };
		processingJobs = processingJobs.filter(jobId => jobId !== id);
		queue = queue.filter(jobId => jobId !== id);
		finished = [...finished, id];
		return { ...state, queue, jobsById, processingJobs, finished };
	},
	progressJobReducer: (state, action) => {
		const { id, progress, progressTs, data } = action.payload;
		if (!state.jobsById[id] || state.finished.includes(id)) {
			return state;
		}
		const jobsById = { ...state.jobsById };
		jobsById[id] = {
			...jobsById[id],
			progress: [
				...(jobsById[id].progress || []),
				{ progress, progressTs, data: { ...(data || {}) } }
			]
		};
		return { ...state, jobsById };
	},
	deleteJobReducer: (state, action) => {
		let jobsById = { ...state.jobsById };
		delete jobsById[action.payload];
		return {
			...state,
			jobsById,
			queue: state.queue.filter(id => id !== action.payload),
			finished: state.finished.filter(id => id !== action.payload),
			processingJobs: state.finished.filter(id => id !== action.payload)
		};
	}
};

const reducersMap = {
  [schedulerTypes.SCHEDULER_JOB_QUEUE]: schedulerReducers.queueJobReducer,
  [schedulerTypes.SCHEDULER_JOB_PROCESS]: schedulerReducers.processJobReducer,
  [schedulerTypes.SCHEDULER_JOB_FINISH]: schedulerReducers.finishJobReducer,
  [schedulerTypes.SCHEDULER_JOB_PROGRESS]: schedulerReducers.progressJobReducer,
  [schedulerTypes.SCHEDULER_JOB_DELETE]: schedulerReducers.deleteJobReducer,
  [schedulerTypes.SCHEDULER_QUEUE_SET_PROCESSING]: schedulerReducers.setProcessingQueueReducer,
  [schedulerTypes.SCHEDULER_QUEUE_SET_CONFIG]: schedulerReducers.setConfigQueueReducer,
  
  
};

export default createReducer(initialState, reducersMap);
