const express = require('express');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.label({ label: 'right meow!' }),
		format.timestamp(),
		format.prettyPrint(),
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/combined.log' }),
	],
});

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', { title: 'Express' });
});
router.get('/log', (req, res) => {
	logger.info('Test');
	logger.error('Error Test');
	res.send(200);
});

module.exports = router;
