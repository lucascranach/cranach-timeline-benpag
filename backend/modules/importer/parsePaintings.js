const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../../global.config');

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

async function validateImageUrl(images) {
	if (images) {
		try {
			await axios.head(images.sizes.s.src);
			return images.sizes.s.src;
		} catch (e) {
			return '';
		}
	} else {
		return '';
	}
}

async function parsePaintings(paintingsJson, lang) {
	const data = await Promise.all(paintingsJson.items.map(
		async (painting) => ({
			id: painting.objectId,
			imageUrl: await validateImageUrl(painting.images),
			detailUrl: config.detailPageHost + painting.inventoryNumber,
			startDate: painting.dating.begin,
			endDate: painting.dating.end,
			title: getTitles(painting.titles),
			location: getLocations(painting.locations),
			artists: getArtists(painting.involvedPersons, lang),
			type: 'painting',
			isBestOf: painting.isBestOf,
		}),
	));
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
