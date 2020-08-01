const fs = require('fs');
const path = require('path');
const axios = require('axios');

function getArtists(involvedPersons) {
	return involvedPersons.filter((it) => it.role === 'Künstler');
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
module.exports = {
	parsePaintingsDe: async (paintingsJson) => {
		const data = await Promise.all(paintingsJson.items.map(
			async (painting) => ({
				id: painting.objectId,
				imageUrl: await validateImageUrl(painting.images),
				startDate: painting.dating.begin,
				endDate: painting.dating.end,
				title: getTitles(painting.titles),
				location: getLocations(painting.locations),
				artists: getArtists(painting.involvedPersons),
				type: 'painting',
			}),
		));
		fs.writeFileSync(
			path.join(`${__dirname}../../../data/paintings.json`), JSON.stringify({ paintings: data }, null, 2),
		);
		return `Parsing paintings successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
	},
};
