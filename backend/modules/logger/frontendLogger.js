const moment = require('moment-timezone');
const { createLogger, format, transports } = require('winston');
const config = require('../../global.config');

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
		appendTimestamp({ tz: config.currentTimezone }),
		format.prettyPrint(),
	),
	defaultMeta: { service: 'frontend' },
	transports: [
		new transports.File({ filename: 'logs/frontendError.log' }),
	],
});

module.exports = backendLogger;
