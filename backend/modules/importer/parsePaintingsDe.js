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
	parsePaintingsDe: (paintingsJson) => {
		try {
			Promise.all(paintingsJson.items.map(
				async (painting) => ({
					id: painting.objectId,
					imageUrl: await validateImageUrl(painting.images),
					startDate: painting.dating.begin,
					endDate: painting.dating.end,
					title: getTitles(painting.titles),
					location: getLocations(painting.locations),
					artists: getArtists(painting.involvedPersons),
				}),
			)).then((data) => fs.writeFileSync(
				path.join(`${__dirname}../../../data/paintings.json`), JSON.stringify({ paintings: data }, null, 2),
			));
		} catch (err) {
			console.error(err);
			return 'Parsing failed!';
		}
		console.log(c);
		return `Parsing successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
	},
};
