const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/all', (req, res) => {
	const jsonPath = path.join(`${__dirname}../../data/graphics.json`);
	if (fs.existsSync(jsonPath)) {
		const result = JSON.parse(fs.readFileSync(jsonPath));
		res.send(result);
	} else {
		res.status(500).send('graphics.json is missing');
	}
});

module.exports = router;
