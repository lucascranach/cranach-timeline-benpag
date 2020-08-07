const moment = require('moment-timezone');
const { createLogger, format, transports } = require('winston');

const appendTimestamp = format((infoParam, opts) => {
	const info = infoParam;
	if (opts.tz) {
		info.timestamp = moment().tz(opts.tz).format();
	}
	return info;
});

const backendLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.errors({ stack: true }),
		appendTimestamp({ tz: 'Europe/Berlin' }),
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
