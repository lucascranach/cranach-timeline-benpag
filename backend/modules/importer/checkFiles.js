const fs = require('fs');
const path = require('path');
const config = require('../../global.config');

function getDaysInMs(days) {
	return ((((days * 24) * 60) * 60) * 1000);
}

function allFilesExist() {
	return fs.existsSync(path.join(__dirname, config.parsedJsonPaths.paintings))
		|| fs.existsSync(path.join(__dirname, config.parsedJsonPaths.archivals))
		|| fs.existsSync(path.join(__dirname, config.parsedJsonPaths.paintings));
}

function timestampIsValid() {
	const jsonFile = fs.readFileSync(path.join(__dirname, '../../data/paintings.json'));
	const jsonData = JSON.parse(jsonFile);

	if (jsonData.timestamp === undefined) {
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
