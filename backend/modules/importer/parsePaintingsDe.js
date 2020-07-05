const fs = require('fs');
const path = require('path');

const dummyImages = [
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-75/01_Overall/G_AT_A_DG1929-75_Overall-002-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-98/01_Overall/G_AT_A_DG1929-98_Overall-002-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-129/01_Overall/G_AT_A_DG1929-129_Overall-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-82/01_Overall/G_AT_A_DG1929-82_Overall-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-188/01_Overall/G_AT_A_DG1929-188_Overall-002-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-74/01_Overall/G_AT_A_DG1929-74_Overall-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-78/01_Overall/G_AT_A_DG1929-78_Overall-002-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-86/01_Overall/G_AT_A_DG1929-86_Overall-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-92/01_Overall/G_AT_A_DG1929-92_Overall-l.jpg',
	'http://lucascranach.org/imageserver/G_AT_A_DG1929-96/01_Overall/G_AT_A_DG1929-96_Overall-l.jpg',
];

module.exports = {
	parsePaintingsDe: () => {
		function getArtists(involvedPersons) {
			return involvedPersons.filter((it) => it.role === 'Künstler');
		}

		function getTitles(titlesArray) {
			return titlesArray.map((it) => it.title);
		}

		function getLocations(locationArray) {
			return locationArray.map((it) => it.term);
		}

		function parseData() {
			const mainAttributes = {
				paintings: [],
			};
			try {
				// eslint-disable-next-line global-require
				const paintingsJson = require('../../data/cda-paintings-v2.de.json');

				mainAttributes.paintings = paintingsJson.items.map((painting) => ({
					id: painting.objectId,
					imageUrl: dummyImages[Math.floor(Math.random() * dummyImages.length)],
					startDate: painting.dating.begin,
					endDate: painting.dating.end,
					title: getTitles(painting.titles),
					location: getLocations(painting.locations),
					artists: getArtists(painting.involvedPersons),
				}));
				fs.writeFileSync(path.join(`${__dirname}../../../data/paintings.json`), JSON.stringify(mainAttributes, null, 2));
			} catch (err) {
				console.error(err);
				return 'Parsing failed!';
			}
			return `Parsing successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
		}

		if (fs.existsSync(path.join(`${__dirname}../../../data/cda-paintings-v2.de.json`))) {
			console.log(parseData());
		} else {
			console.log('cda-paintings-v2.de.json is missing');
		}
	},
};
