const fs = require('fs');
const path = require('path');
const config = require('../../global.config');

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
	// 604800000 equals 7 days
	return currentDateInMs - timestampDate <= 604800000;
}
module.exports = {
	filesValid: () => {
		if (allFilesExist()) {
			return timestampIsValid();
		}
		return false;
	},
};
