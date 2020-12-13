const express = require('express');
const serverlessExpressMiddleware = require('aws-serverless-express/middleware');
const frontendLogger = require('../modules/logger/frontendLogger');

const router = express.Router();

router.use(serverlessExpressMiddleware.eventContext());
router.post('/frontend', (req, res) => {
	const frontendError = req.body;
	frontendLogger.error(frontendError);
	res.sendStatus(200);
});

module.exports = router;
