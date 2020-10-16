const fs = require('fs');
const path = require('path');
const config = require('../../global.config');

function parseArchivals(archivalsJson, lang) {
	const mainAttributes = {
		archivals: [],
	};
	mainAttributes.archivals = archivalsJson.items.map((archival) => ({
		id: archival.inventoryNumber,
		imageUrl: '',
		detailUrl: config.detailPageHost + config.archivalDetailPagePath + archival.inventoryNumber,
		startDate: archival.dating.begin,
		endDate: archival.dating.end,
		title: archival.inventoryNumber,
		location: '',
		artists: '',
		repository: archival.repository,
		summary: archival.summaries[0],
		type: 'archival',
	})).filter((w) => w.startDate > 1490 && w.startDate < 1590);
	fs.writeFileSync(path.join(`${__dirname}../../../data/archivals_${lang}.json`), JSON.stringify(mainAttributes, null, 2));
	return `Parsing archivals successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

module.exports = {
	parseArchivalsDe: (archivalsJson) => parseArchivals(archivalsJson, 'de'),
	parseArchivalsEn: (archivalsJson) => parseArchivals(archivalsJson, 'en'),
};
