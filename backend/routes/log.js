const express = require('express');
const backendLogger = require('../modules/Logger/backendLogger');
const frontendLogger = require('../modules/Logger/frontendLogger');

const router = express.Router();

router.post('/frontend', (req, res) => {
	try {
		const frontendError = req.body;
		frontendLogger.error(frontendError);
		res.sendStatus(200);
	} catch (e) {
		backendLogger.error(e);
		res.sendStatus(500);
	}
});

module.exports = router;
