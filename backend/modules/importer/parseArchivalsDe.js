const fs = require('fs');
const path = require('path');

module.exports = {
	parseArchivalsDe: (archivalsJson) => {
		const mainAttributes = {
			archivals: [],
		};
		try {
			mainAttributes.archivals = archivalsJson.items.map((archival) => ({
				id: archival.inventoryNumber,
				imageUrl: '',
				startDate: archival.dating.begin,
				endDate: archival.dating.end,
				title: archival.inventoryNumber,
				location: '',
				artists: '',
				repository: archival.repository,
				summary: archival.summaries[0],
				type: 'archival',
			}));
			fs.writeFileSync(path.join(`${__dirname}../../../data/archivals.json`), JSON.stringify(mainAttributes, null, 2));
		} catch (err) {
			console.error(err);
			return 'Parsing failed!';
		}
		return `Parsing archivals successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
	},
};
