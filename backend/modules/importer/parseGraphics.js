const fs = require('fs');
const path = require('path');

function getSortingDate(sortingDate, beginDate) {
	if (sortingDate.includes('-')) {
		const sortingDateDecimal = sortingDate.replace('-', '.');
		return parseFloat(sortingDateDecimal.replace(/-/g, ''));
	}
	return beginDate;
}

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

function getRepresentativeImage(inventoryNumber, images) {
	if (!images) {
		console.log(`Missing image for ${inventoryNumber}`);
		return '';
	}
	return images.representative.variants.shift().s.src;
}

function parseGraphics(graphicsJson, lang) {
	const mainAttributes = {
		graphics: [],
	};
	mainAttributes.graphics = graphicsJson.items.map((graphic) => ({
		id: graphic.objectId,
		imageUrl: getRepresentativeImage(graphic.inventoryNumber, graphic.images),
		startDate: graphic.dating.begin,
		endDate: graphic.dating.end,
		sortingDate: getSortingDate(graphic.sortingNumber, graphic.dating.begin),
		title: getTitles(graphic.titles),
		location: getLocations(graphic.locations),
		artists: getArtists(graphic.involvedPersons, lang),
		owner: graphic.owner,
		type: 'graphic',
	}));
	mainAttributes.graphics.sort((a, b) => a.sortingDate - b.sortingDate);
	fs.writeFileSync(path.join(`${__dirname}../../../data/graphics_${lang}.json`), JSON.stringify(mainAttributes, null, 2));
	return `Parsing graphics successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

module.exports = {
	parseGraphicsDe: (graphicsJson) => parseGraphics(graphicsJson, 'de'),
	parseGraphicsEn: (graphicsJson) => parseGraphics(graphicsJson, 'en'),
};
