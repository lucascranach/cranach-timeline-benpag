const express = require('express');
const serverlessExpressMiddleware = require('aws-serverless-express/middleware');

const router = express.Router();

router.use(serverlessExpressMiddleware.eventContext());
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
