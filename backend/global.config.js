require('dotenv').config();

module.exports = {
	dataBaseUrl: 'https://raw.githubusercontent.com/lucascranach/importer/master/docs',
	placeholderImageUrl: 'https://secureavi.com/wp-content/uploads/2020/09/SecureAvi-NoImage.png',
	detailPageHost: 'http://lucascranach.org/',
	archivalDetailPagePath: 'archival-documents/',
	jsonFiles: [
		// { uri: '/20191122/cda-graphics-restoration-v2.json', title: 'cda-graphics-restoration-v2.json' },
		// { uri: '/20191122/cda-graphics-v2.real.de.json', title: 'cda-graphics-v2.real.de.json' },
		// { uri: '/20191122/cda-graphics-v2.real.en.json', title: 'cda-graphics-v2.real.en.json' },
		{ uri: '/20200819/cda-graphics-v2.virtual.de.json', title: 'cda-graphics-v2.virtual.de.json' },
		{ uri: '/20200819/cda-graphics-v2.virtual.en.json', title: 'cda-graphics-v2.virtual.en.json' },
		// { uri: '/20191122/cda-literaturereferences-v2.json', title: 'cda-literaturereferences-v2.json' },
		{ uri: '/20200819/cda-paintings-v2.de.json', title: 'cda-paintings-v2.de.json' },
		{ uri: '/20200819/cda-paintings-v2.en.json', title: 'cda-paintings-v2.en.json' },
		{ uri: '/20201009/cda-archivals-v2.de.json', title: 'cda-archivals-v2.de.json' },
		{ uri: '/20201009/cda-archivals-v2.en.json', title: 'cda-archivals-v2.en.json' },
	],
	parsedJsonPaths: {
		paintings_de: '../../data/paintings_de.json',
		graphics_de: '../../data/graphics_de.json',
		archivals_de: '../../data/archivals_de.json',
		paintings_en: '../../data/paintings_en.json',
		graphics_en: '../../data/graphics_en.json',
		archivals_en: '../../data/archivals_en.json',
	},
	newParseIntervallInDays: 7,
	port: 3000,
	eventTypes: [
		'cranachElder',
		'cranachYounger',
		'luther',
		'history',
	],
	currentTimezone: 'Europe/Berlin',
	logFileNames: {
		backend: 'logs/backendError.log',
		frontend: 'logs/frontendError.log',
	},
	logLevels: {
		backendFile: 'error',
		backendConsole: 'debug',
		MinReqLevel: 'info',
	},
	geocodingUrl: `https://geocoder.ls.hereapi.com/6.2/geocode.json?maxresults=1&apiKey=${process.env.API_KEY}`,
};
