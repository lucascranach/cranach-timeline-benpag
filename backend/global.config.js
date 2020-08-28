module.exports = {
	dataBaseUrl: 'https://raw.githubusercontent.com/lucascranach/importer/master/docs',
	placeholderImageUrl: 'https://via.placeholder.com/350',
	jsonFiles: [
		// { uri: '/20191122/cda-graphics-restoration-v2.json', title: 'cda-graphics-restoration-v2.json' },
		// { uri: '/20191122/cda-graphics-v2.real.de.json', title: 'cda-graphics-v2.real.de.json' },
		// { uri: '/20191122/cda-graphics-v2.real.en.json', title: 'cda-graphics-v2.real.en.json' },
		{ uri: '/20200819/cda-graphics-v2.virtual.de.json', title: 'cda-graphics-v2.virtual.de.json' },
		// { uri: '/20191122/cda-graphics-v2.virtual.en.json', title: 'cda-graphics-v2.virtual.en.json' },
		// { uri: '/20191122/cda-literaturereferences-v2.json', title: 'cda-literaturereferences-v2.json' },
		{ uri: '/20200819/cda-paintings-v2.de.json', title: 'cda-paintings-v2.de.json' },
		// { uri: '/20200110/cda-paintings-v2.en.json', title: 'cda-paintings-v2.en.json'' },
		{ uri: '/20200819/cda-archivals-v2.de.json', title: 'cda-archivals-v2.de.json' },
		// { uri: '/20191122/cda-archivals-v2.en.json', title: 'cda-archivals-v2.en.json' },
	],
	parsedJsonPaths: {
		paintings: '../../data/paintings.json',
		graphics: '../../data/graphics.json',
		archivals: '../../data/archivals.json',
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
};
