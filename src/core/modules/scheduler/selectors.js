export const selectScheduler = state => state.scheduler;

export const selectQueued = state => {
	const { queue, jobsById } = selectScheduler(state);
	return queue.map(id => jobsById[id]);
};

export const selectFinished = state => {
	const { finished, jobsById } = selectScheduler(state);
	return finished.map(id => jobsById[id]);
};

export const selectProcessingJobs = state => {
	const { processingJobs, jobsById } = selectScheduler(state);
	return processingJobs.map(id => jobsById[id]);
};

export const selectJobsToProcess = state => {
	const ts = Date.now();
	return selectQueued(state).filter(job => job.at <= ts);
};

export const selectJob = (state, id) => selectScheduler(state).jobsById[id];

export const isSchedulerProcessing = state =>
	!!selectScheduler(state).processing;

export const selectProcessingJobsByCategory = (state, category) =>
	selectProcessingJobs(state).filter(job => job.category === category);

export const selectQueuedJobsByCategory = (state, category, maxAnticipationTime = null) => {
	const ts = Date.now();
	return selectQueued(state).filter(job => {
		if (maxAnticipationTime !== null && job.at > ts + maxAnticipationTime) {
			return false;
		}
		return job.category === category;
	});
};

export const selectJobsInProgressByCategory = (state, category, maxAnticipationTime = 0) => {
	const processing = selectProcessingJobsByCategory(state, category);
	const queued = selectQueuedJobsByCategory(
		state,
		category,
		maxAnticipationTime,
	);
	return [...processing, ...queued];
};
