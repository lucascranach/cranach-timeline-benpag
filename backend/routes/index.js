const express = require('express');
const logger = require('../modules/Logger/logger');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	try {
		res.render('index', { title: 'Express' });
	} catch (e) {
		logger.error(e);
		res.send(e);
	}
});

module.exports = router;
