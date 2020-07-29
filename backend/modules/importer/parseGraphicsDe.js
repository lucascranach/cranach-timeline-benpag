const fs = require('fs');
const path = require('path');
const logger = require('../Logger/logger');

function getTitles(titlesArray) {
	return titlesArray.map((it) => it.title);
}

function getLocations(locationArray) {
	return locationArray.map((it) => it.term);
}

function getArtists(involvedPersons) {
	return involvedPersons.filter((it) => it.role === 'Künstler' || 'Drucker');
}

module.exports = {
	parseGraphicsDe: (graphicsJson) => {
		const mainAttributes = {
			graphics: [],
		};
		try {
			mainAttributes.graphics = graphicsJson.items.map((graphic) => ({
				id: graphic.objectId,
				imageUrl: 'http://lucascranach.org/imageserver/G_AT_A_DG1929-75/01_Overall/G_AT_A_DG1929-75_Overall-002-s.jpg',
				startDate: graphic.dating.begin,
				endDate: graphic.dating.end,
				title: getTitles(graphic.titles),
				location: getLocations(graphic.locations),
				artists: getArtists(graphic.involvedPersons),
			}));
			fs.writeFileSync(path.join(`${__dirname}../../../data/graphics.json`), JSON.stringify(mainAttributes, null, 2));
		} catch (err) {
			logger.error(err);
			return 'Parsing failed!';
		}
		return `Parsing successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
	},
};
