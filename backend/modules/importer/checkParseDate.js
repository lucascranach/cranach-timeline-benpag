const fs = require('fs');
const path = require('path');
const config = require('../../global.config');

module.exports = {
	newParseRequired: () => {
		if (fs.existsSync(config.parsedJsonPaths.paintings)) {
			const jsonFile = fs.readFileSync('../../data/paintings.json');
			const jsonData = JSON.parse(jsonFile);

			if (jsonData.timestamp !== undefined) {
				const currentDateInMs = new Date().getSeconds();
				const timestampDate = new Date(jsonData.timestamp).getSeconds();

				if (currentDateInMs - timestampDate < 604800) {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return true;
		}
		return true;
	},
};
