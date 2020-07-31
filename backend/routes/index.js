const express = require('express');
const backendLogger = require('../modules/Logger/backendLogger');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	try {
		res.render('index', { title: 'Express' });
	} catch (e) {
		backendLogger.error(e);
		res.send(e);
	}
});

module.exports = router;
