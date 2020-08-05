const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.format({
		'application/json': () => {
			res.sendStatus(200);
		},
		default() {
			res.status(406).send('Not Acceptable');
		},
	});
});

module.exports = router;
