const fs = require('fs');
const path = require('path');
// const axios = require('axios');
const config = require('../../global.config');

function getSortingDate(sortingDate, beginDate) {
	if (sortingDate.includes('-')) {
		const sortingDateDecimal = sortingDate.replace('-', '.');
		return parseFloat(sortingDateDecimal.replace(/-/g, ''));
	}
	return beginDate;
}

function getArtists(involvedPersons, lang) {
	if (lang === 'de') {
		return involvedPersons.filter((it) => it.role === 'Künstler');
	}
	return involvedPersons.filter((it) => it.role === 'Artist');
}

function getTitles(titlesArray) {
	return titlesArray.map((it) => it.title);
}

function getLocations(locationArray) {
	return locationArray.map((it) => it.term);
}

function getRepresentativeImage(inventoryNumber, images) {
	if (!images) {
		console.log('Bild fehlt', inventoryNumber);
		return '';
	}
	return images.representative.variants.shift().s.src;
}

async function parsePaintings(paintingsJson, lang) {
	const data = await Promise.all(paintingsJson.items.map(
		async (painting) => ({
			id: painting.objectId,
			imageUrl: getRepresentativeImage(painting.inventoryNumber, painting.images),
			detailUrl: config.detailPageHost + painting.inventoryNumber,
			startDate: painting.dating.begin,
			endDate: painting.dating.end,
			sortingDate: getSortingDate(painting.sortingNumber, painting.dating.begin),
			title: getTitles(painting.titles),
			location: getLocations(painting.locations),
			artists: getArtists(painting.involvedPersons, lang),
			owner: painting.owner,
			type: 'painting',
			isBestOf: painting.isBestOf,
		}),
	));
	data.sort((a, b) => a.sortingDate - b.sortingDate);
	fs.writeFileSync(
		path.join(`${__dirname}../../../data/paintings_${lang}.json`), JSON.stringify(
			{
				timestamp: new Date(),
				paintings: data,
			}, null, 2,
		),
	);
	return `Parsing paintings successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

module.exports = {
	parsePaintingsDe: async (paintingsJson) => parsePaintings(paintingsJson, 'de'),
	parsePaintingsEn: async (paintingsJson) => parsePaintings(paintingsJson, 'en'),
};
