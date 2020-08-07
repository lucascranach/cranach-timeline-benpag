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
	level: config.logLevels.MinReqLevel,
	format: format.combine(
		format.errors({ stack: true }),
		appendTimestamp({ tz: config.currentTimezone }),
		format.prettyPrint(),
	),
	defaultMeta: { service: 'backend' },
	transports: [
		new transports.File({ filename: 'logs/backendError.log', level: config.logLevels.backendFile }),
		new transports.Console({
			level: config.logLevels.backendConsole,
			handleExceptions: true,
			json: false,
			colorize: true,
		}),
	],
});

module.exports = backendLogger;
