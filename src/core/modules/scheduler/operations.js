import { SchedulerService } from 'core/services/scheduler/scheduler-service';
import {schedulerActions} from './actions';
import * as schedulerSelectors from './selectors';

export const SCHEDULER_INTERVAL = 10000;
export const SCHEDULER_CLEANUP_DELAY = 60000;


const operations = {
  ...schedulerActions,
  processOneJob: job => async (dispatch, getState) => {
		const schedulerService = SchedulerService.getInstance();

		await dispatch(operations.processJobAction(job.id, Date.now()));
		const jobObj = schedulerService.initJob(job);
		if (!jobObj) {
			return dispatch(
				schedulerActions.cancelJobAction(
					job.id,
					job.category,
					Date.now(),
					{
						code: 'no_handler',
						message: 'No handler for this job type'
					},
					job.data
				)
			);
		}
		jobObj.on('progress', (progress, data) => {
			dispatch(schedulerActions.progressJobAction(job.id, Date.now(), progress, data));
		});

		try {
			const result = await jobObj.execute();
			await dispatch(
				schedulerActions.finishJobAction(
					job.id,
					job.category,
					Date.now(),
					'success',
					result,
					job.data
				)
			);
			return result;
		} catch (error) {
			await dispatch(
				schedulerActions.cancelJobAction(job.id, job.category, Date.now(), {
					code: error.code || 'canceled',
					message: error.message || 'Job canceled'
				}),
				job.data
			);
			return error;
		} finally {
			if (jobObj.hasJobs()) {
				await Promise.all(
					jobObj
						.getJobs()
						.map(job =>
							dispatch(
								schedulerOperations.queueJobAction(
									job.id || null,
									job.category,
									job.at,
									job.data,
									job.strategy
								)
							)
						)
				);
			}
		}
	},

	processJobsOperation: () => async (dispatch, getState) => {
		const jobs = schedulerSelectors.selectJobsToProcess(getState());
		return Promise.all(jobs.map(job => dispatch(operations.processOneJob(job))));
	},

	startSchedulerOperation: () => async (dispatch, getState) => {
		if (schedulerSelectors.isSchedulerProcessing(getState())) {
			return;
		}
		await dispatch(operations.setProcessingQueueAction(true));
		while (schedulerSelectors.isSchedulerProcessing(getState())) {
			const ts = Date.now();
			const toClean = schedulerSelectors
				.selectFinished(getState())
				.filter(job => ts - job.finishTs > SCHEDULER_CLEANUP_DELAY);

			await Promise.all(toClean.map(job => dispatch(operations.deleteJobAction(job.id))));

			await dispatch(operations.processJobsOperation());
			await new Promise((resolve, reject) => {
				setTimeout(() => resolve(), SCHEDULER_INTERVAL);
			});
		}
	},

	stopSchedulerOperation: () => async (dispatch, getState) => {
		await dispatch(operations.setProcessingQueueAction(false));
	}
};

export const schedulerOperations = operations;

export default schedulerOperations;