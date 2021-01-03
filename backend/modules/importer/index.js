const axios = require('axios');
const fs = require('fs');
const path = require('path');
const parserPaintings = require('./parsePaintings');
const parserGraphics = require('./parseGraphics');
const parserArchivals = require('./parseArchivals');
const checkFiles = require('./checkFiles');

const config = require('../../global.config');

async function importData() {
	const promises = [];
	config.jsonFiles.forEach((file) => {
		promises.push(axios.get(config.dataBaseUrl + file.uri).then((jsonData) => {
			if (file.title === 'cda-paintings-v2.de.json') {
				return parserPaintings.parsePaintingsDe(jsonData.data);
			} if (file.title === 'cda-paintings-v2.en.json') {
				return parserPaintings.parsePaintingsEn(jsonData.data);
			} if (file.title === 'cda-graphics-v2.virtual.de.json') {
				return parserGraphics.parseGraphicsDe(jsonData.data);
			} if (file.title === 'cda-graphics-v2.virtual.en.json') {
				return parserGraphics.parseGraphicsEn(jsonData.data);
			} if (file.title === 'cda-archivals-v2.de.json') {
				return parserArchivals.parseArchivalsDe(jsonData.data);
			} if (file.title === 'cda-archivals-v2.en.json') {
				return parserArchivals.parseArchivalsEn(jsonData.data);
			}
			return file.title;
		}).catch((error) => console.error(error)));
	});

	return Promise.all(promises).then((data) => data.join('\n'));
}

if (!fs.existsSync(path.join(`${__dirname}../../../data/`))) fs.mkdirSync(path.join(`${__dirname}../../../data/`));

console.debug('Check if parsing is required...');
if (!process.argv.includes('--force') && checkFiles.filesValid()) {
	console.debug('No parse required!');
} else {
	console.debug('Parse is required!');
	importData().then((result) => {
		console.debug('Parsing completed');
		console.debug(result);
	});
}
