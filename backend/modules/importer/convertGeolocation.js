/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../../global.config');
const backendLogger = require('../logger/backendLogger');

function collectLocations() {
	const locationNames = {};
	Object.values(config.parsedJsonPaths).forEach((fileName) => {
		Object.values(JSON.parse(fs.readFileSync(path.join(__dirname, fileName)), 'UTF-8')).forEach((entries) => {
			if (Array.isArray(entries)) {
				entries.forEach((entry) => {
					if (entry.location) {
						entry.location.forEach((location) => {
							if (!locationNames[location]) {
								locationNames[location] = '';
							}
						});
					}
				});
			}
		});
	});
	return locationNames;
}

async function parseGeodata(locations) {
	const geolocations = {};
	for (const i in Object.keys(locations)) {
		try {
			const response = await axios.get(encodeURI(`${config.geocodingUrl}&searchtext=${Object.keys(locations)[i]}`));
			if (response.data.Response.View.length > 0) {
				geolocations[Object.keys(locations)[i]] = response.data.Response.View[0].Result[0].Location.DisplayPosition;
			}
		} catch (err) {
			backendLogger.error(`Could not find a geolocation for: ${Object.keys(locations)[i]}`);
		}
	}
	return geolocations;
}

function fillGeolocations(geolocations) {
	Object.values(config.parsedJsonPaths).forEach((fileName) => {
		const file = JSON.parse(fs.readFileSync(path.join(__dirname, fileName)), 'UTF-8');
		Object.values(file).forEach((entries) => {
			if (Array.isArray(entries)) {
				entries.forEach((entry) => {
					if (entry.location) {
						// We need to manipulate the json, so we need to reassign this
						// eslint-disable-next-line no-param-reassign
						entry.geolocations = [];
						entry.location.forEach((location) => {
							entry.geolocations.push(geolocations[location]);
						});
					}
				});
			}
		});
		fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(file, null, 2));
	});
}

module.exports = {
	convert: async () => {
		const locations = collectLocations();
		const geolocations = await parseGeodata(locations);
		fillGeolocations(geolocations);
	},
};
