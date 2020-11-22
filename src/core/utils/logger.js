export class Logger {
	constructor(name) {
		this.name = name;
	}
	
	log = (level, msg, ...args) => {
		console.log(`${level}: ${msg}`);
		console.log(args);
	};

	info = (msg, ...args) => {
		this.log('info', msg, ...args);
	};

	warn = (msg, ...args) => {
		this.log('warn', msg, ...args);
	};

	error = (msg, ...args) => {
		this.log('error', msg, ...args);
	};

	verbose = (msg, ...args) => {
		this.log('verbose', msg, ...args);
	};

	debug = (msg, ...args) => {
		this.log('debug', msg, ...args);
	};

	trace = (msg, ...args) => {
		this.log('trace', msg, ...args);
	};
}

