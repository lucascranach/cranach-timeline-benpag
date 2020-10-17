const fs = require('fs');
const path = require('path');

function getTitles(titlesArray) {
	return titlesArray.map((it) => it.title);
}

function getLocations(locationArray) {
	return locationArray.map((it) => it.term);
}

function getArtists(involvedPersons, lang) {
	if (lang === 'de') {
		return involvedPersons.filter((it) => it.role === 'Künstler' || 'Drucker');
	}
	return involvedPersons.filter((it) => it.role === 'Artist' || 'printer');
}

function parseGraphics(graphicsJson, lang) {
	const mainAttributes = {
		graphics: [],
	};
	mainAttributes.graphics = graphicsJson.items.map((graphic) => ({
		id: graphic.objectId,
		imageUrl: '',
		startDate: graphic.dating.begin,
		endDate: graphic.dating.end,
		title: getTitles(graphic.titles),
		location: getLocations(graphic.locations),
		artists: getArtists(graphic.involvedPersons, lang),
		owner: graphic.owner,
		type: 'graphic',
	}));
	fs.writeFileSync(path.join(`${__dirname}../../../data/graphics_${lang}.json`), JSON.stringify(mainAttributes, null, 2));
	return `Parsing graphics successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

module.exports = {
	parseGraphicsDe: (graphicsJson) => parseGraphics(graphicsJson, 'de'),
	parseGraphicsEn: (graphicsJson) => parseGraphics(graphicsJson, 'en'),
};
