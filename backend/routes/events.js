const express = require('express');
const fs = require('fs');
const path = require('path');
const { eventTypes } = require('../global.config');

const router = express.Router();

router.get('/:event', (req, res) => {
	res.format({
		'application/json': () => {
			const eventType = req.params.event;
			if (eventTypes.includes(eventType)) {
				const jsonPath = path.join(`${__dirname}../../data/${eventType}Events.json`);
				if (fs.existsSync(jsonPath)) {
					const result = JSON.parse(fs.readFileSync(jsonPath));
					res.send(result);
				} else {
					res.status(500).send({ error: `${eventType}Events.json is missing` });
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
