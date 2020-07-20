const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/cranachElder', (req, res) => {
	const jsonPath = path.join(`${__dirname}../../data/cranachElderEvents.json`);
	if (fs.existsSync(jsonPath)) {
		const result = JSON.parse(fs.readFileSync(jsonPath));
		res.send(result);
	} else {
		res.status(500).send('cranachElderEvents.json is missing');
	}
});

router.get('/cranachYounger', (req, res) => {
	const jsonPath = path.join(`${__dirname}../../data/cranachYoungerEvents.json`);
	if (fs.existsSync(jsonPath)) {
		const result = JSON.parse(fs.readFileSync(jsonPath));
		res.send(result);
	} else {
		res.status(500).send('cranachYoungerEvents.json is missing');
	}
});

router.get('/luther', (req, res) => {
	const jsonPath = path.join(`${__dirname}../../data/lutherEvents.json`);
	if (fs.existsSync(jsonPath)) {
		const result = JSON.parse(fs.readFileSync(jsonPath));
		res.send(result);
	} else {
		res.status(500).send('lutherEvents.json is missing');
	}
});

router.get('/history', (req, res) => {
	const jsonPath = path.join(`${__dirname}../../data/historyEvents.json`);
	if (fs.existsSync(jsonPath)) {
		const result = JSON.parse(fs.readFileSync(jsonPath));
		res.send(result);
	} else {
		res.status(500).send('historyEvents.json is missing');
	}
});

module.exports = router;
