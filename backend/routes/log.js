const express = require('express');
const frontendLogger = require('../modules/logger/frontendLogger');

const router = express.Router();

router.post('/frontend', (req, res) => {
	const frontendError = req.body;
	frontendLogger.error(frontendError);
	res.sendStatus(200);
});

module.exports = router;
