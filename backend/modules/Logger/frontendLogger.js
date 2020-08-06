const { createLogger, format, transports } = require('winston');

const backendLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.errors({ stack: true }),
		format.timestamp(),
		format.prettyPrint(),
	),
	defaultMeta: { service: 'frontend' },
	transports: [
		new transports.File({ filename: 'logs/frontendError.log' }),
	],
});

module.exports = backendLogger;
