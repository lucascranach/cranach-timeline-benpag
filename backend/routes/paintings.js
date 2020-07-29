const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../modules/Logger/logger');

const router = express.Router();

router.get('/all', (req, res) => {
	try {
		const jsonPath = path.join(`${__dirname}../../data/paintings.json`);
		if (fs.existsSync(jsonPath)) {
			const result = JSON.parse(fs.readFileSync(jsonPath));
			res.send(result);
		} else {
			res.status(500).send('paintings.json is missing');
		}
	} catch (e) {
		logger.error(e);
		res.status(500).send(e);
	}
});

module.exports = router;
