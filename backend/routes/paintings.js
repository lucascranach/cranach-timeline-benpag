const express = require('express');
const fs = require('fs');
const path = require('path');
const serverlessExpressMiddleware = require('aws-serverless-express/middleware');

const router = express.Router();

router.use(serverlessExpressMiddleware.eventContext());
router.get('/', (req, res) => {
	const { lang } = req.query;
	res.format({
		'application/json': () => {
			const jsonPath = path.join(`${__dirname}../../data/paintings_${lang}.json`);
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
