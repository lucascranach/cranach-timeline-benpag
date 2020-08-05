const axios = require('axios');
const fs = require('fs');
const path = require('path');
const parserPaintings = require('./parsePaintingsDe');
const parserGraphics = require('./parseGraphicsDe');
const backendLogger = require('../modules/Logger/backendLogger');
const parserArchivals = require('./parseArchivalsDe');

const config = require('../../global.config');

async function importData() {
	const promises = [];
	config.jsonFiles.forEach((file) => {
		promises.push(axios.get(config.dataBaseUrl + file.uri).then((jsonData) => {
			if (file.title === 'cda-paintings-v2.de.json') {
				return parserPaintings.parsePaintingsDe(jsonData.data);
			} if (file.title === 'cda-graphics-v2.virtual.de.json') {
				return parserGraphics.parseGraphicsDe(jsonData.data);
			} if (file.title === 'cda-archivals-v2.de.json') {
				return parserArchivals.parseArchivalsDe(jsonData.data);
			}
			return file.title;
		}).catch((error) => backendLogger.error(error)));
	});

	return Promise.all(promises).then((data) => data.join('\n'));
}

if (!fs.existsSync(path.join(`${__dirname}../../../data/`))) fs.mkdirSync(path.join(`${__dirname}../../../data/`));

importData().then((result) => {
	console.log(result);
});
