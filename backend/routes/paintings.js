const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
	res.format({
		'application/json': () => {
			const jsonPath = path.join(`${__dirname}../../data/paintings.json`);
			if (fs.existsSync(jsonPath)) {
				const result = JSON.parse(fs.readFileSync(jsonPath));
				res.send(result);
			} else {
				res.status(500).send({ error: 'paintings.json is missing' });
			}
		},
		default() {
			res.status(406).send('Not Acceptable');
		},
	});
});

module.exports = router;
