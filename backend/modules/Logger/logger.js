const { createLogger, format, transports } = require('winston');

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.errors({ stack: true }),
		format.timestamp(),
		format.prettyPrint(),
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/combined.log' }),
		new transports.Console({
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true,
		}),
	],
});

module.exports = logger;
