const express = require('express');
const fs = require('fs');
const path = require('path');
const serverlessExpressMiddleware = require('aws-serverless-express/middleware');
const { eventTypes } = require('../global.config');

const router = express.Router();

router.use(serverlessExpressMiddleware.eventContext());
router.get('/:event', (req, res) => {
	const { lang } = req.query;
	res.format({
		'application/json': () => {
			const eventType = req.params.event;
			if (eventTypes.includes(eventType)) {
				const jsonPath = path.join(`${__dirname}../../data/${eventType}Events_${lang}.json`);
				if (fs.existsSync(jsonPath)) {
					const result = JSON.parse(fs.readFileSync(jsonPath));
					res.send(result);
				} else {
					res.status(500).send({ error: `${eventType}Events_${lang}.json is missing` });
				}
			} else {
				res.status(500).send({ error: 'Unknown event type' });
			}
		},
		default() {
			res.status(406).send('Not Acceptable');
		},
	});
});

module.exports = router;
