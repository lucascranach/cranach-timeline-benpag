const fs = require('fs');
const path = require('path');

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
				imageUrl: '',
				startDate: graphic.dating.begin,
				endDate: graphic.dating.end,
				title: getTitles(graphic.titles),
				location: getLocations(graphic.locations),
				artists: getArtists(graphic.involvedPersons),
				type: 'graphic',
			}));

			fs.writeFileSync(path.join(`${__dirname}../../../data/graphics.json`), JSON.stringify(mainAttributes, null, 2));
			return `Parsing graphics successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
		} catch (err) {
			console.error(err);
			return 'Parsing failed!';
		}
	},
};
