const { createLogger, format, transports } = require('winston');

const backendLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.errors({ stack: true }),
		format.timestamp(),
		format.prettyPrint(),
	),
	defaultMeta: { service: 'backend' },
	transports: [
		new transports.File({ filename: 'logs/backendError.log', level: 'error' }),
		new transports.Console({
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true,
		}),
	],
});

module.exports = backendLogger;
