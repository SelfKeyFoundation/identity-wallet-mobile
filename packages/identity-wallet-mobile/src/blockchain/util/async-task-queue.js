import _ from 'lodash';
import { promisify } from 'es6-promisify';

import async from 'async';

export class AsyncTaskQueue {
	constructor(executor, delay) {
		this.executor = executor;
		this.delay = delay;
		this.q = async.queue(this.handleTask.bind(this), 1);
		this.nextExecution = null;
		this.q.push = promisify(this.q.push);
	}
	handleTask(task, callback) {
		const ts = Date.now();
		let res;
		if (this.nextExecution && ts < this.nextExecution) {
			_.delay(() => this.handleTask(task, callback), this.nextExecution - ts);
			return;
		}
		this.nextExecution = ts + this.delay;
		try {
			res = this.executor(task);
		} catch (err) {
			callback(err);
			return;
		}
		if (res instanceof Promise) {
			res.then(res => callback(null, res)).catch(err => callback(err));
			return;
		}
		callback(null, res);
	}
	push(task) {
		try {
			return this.q.push(task);
		} catch(err) {
			console.error(err);
		}
	}
}

export default AsyncTaskQueue;
