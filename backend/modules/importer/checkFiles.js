const fs = require('fs');
const path = require('path');
const config = require('../../global.config');

function getDaysInMs(days) {
	return days * 24 * 60 * 60 * 1000;
}

function allFilesExist() {
	return fs.existsSync(path.join(__dirname, config.parsedJsonPaths.paintings_de))
		|| fs.existsSync(path.join(__dirname, config.parsedJsonPaths.archivals_de))
		|| fs.existsSync(path.join(__dirname, config.parsedJsonPaths.graphics_de))
		|| fs.existsSync(path.join(__dirname, config.parsedJsonPaths.paintings_en))
		|| fs.existsSync(path.join(__dirname, config.parsedJsonPaths.archivals_en))
		|| fs.existsSync(path.join(__dirname, config.parsedJsonPaths.graphics_en));
}

function timestampIsValid() {
	const jsonFile = fs.readFileSync(path.join(__dirname, '../../data/paintings_de.json'));
	const jsonData = JSON.parse(jsonFile);

	if (typeof jsonData.timestamp === 'undefined') {
		return false;
	}
	const currentDateInMs = new Date();
	const timestampDate = new Date(jsonData.timestamp);
	return currentDateInMs - timestampDate <= getDaysInMs(config.newParseIntervallInDays);
}
module.exports = {
	filesValid: () => {
		if (allFilesExist()) {
			return timestampIsValid();
		}
		return false;
	},
};
