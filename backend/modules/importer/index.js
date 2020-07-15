const axios = require('axios');
const fs = require('fs');
const path = require('path');
const parserPaintings = require('./parsePaintingsDe');
const parserGraphics = require('./parseGraphicsDe');
const parserArchivals = require('./parseArchivalsDe');

const config = require('../../global.config');

async function importData() {
	try {
		config.jsonFiles.forEach((file) => {
			axios.get(config.dataBaseUrl + file.uri).then((jsonData) => {
				if (file.title === 'cda-paintings-v2.de.json') {
					parserPaintings.parsePaintingsDe(jsonData.data);
				} else if (file.title === 'cda-graphics-v2.virtual.de.json') {
					parserGraphics.parseGraphicsDe(jsonData.data);
				} else if (file.title === 'cda-archivals-v2.de.json') {
					parserArchivals.parseArchivalsDe(jsonData.data);
				}
			}).catch((error) => console.error(error));
		});
	} catch (err) {
		console.error(err);
		return 'Data import failed';
	}
	return `Data import succeeded, JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

if (!fs.existsSync(path.join(`${__dirname}../../../data/`))) fs.mkdirSync(path.join(`${__dirname}../../../data/`));

importData().then((result) => {
	console.log(result);
});
