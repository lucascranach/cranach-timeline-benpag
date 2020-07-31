const express = require('express');
const fs = require('fs');
const path = require('path');
const backendLogger = require('../modules/Logger/backendLogger');

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
		backendLogger.error(e);
		res.status(500).send(e);
	}
});

module.exports = router;
