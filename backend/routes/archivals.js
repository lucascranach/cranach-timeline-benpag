const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
	const { lang } = req.query;
	res.format({
		'application/json': () => {
			const jsonPath = path.join(`${__dirname}../../data/archivals_${lang}.json`);
			if (fs.existsSync(jsonPath)) {
				const result = JSON.parse(fs.readFileSync(jsonPath));
				res.send(result);
			} else {
				res.status(500).send({ error: 'archivals.json is missing' });
			}
		},
		default() {
			res.status(406).send('Not Acceptable');
		},
	});
});

module.exports = router;
