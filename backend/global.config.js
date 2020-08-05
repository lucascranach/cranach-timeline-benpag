module.exports = {
	dataBaseUrl: 'https://raw.githubusercontent.com/lucascranach/importer/pipe-system/output/',
	placeholderImageUrl: 'https://via.placeholder.com/350',
	jsonFiles: [
		// { uri: '/20191122/cda-graphics-restoration-v2.json', title: 'cda-graphics-restoration-v2.json' },
		// { uri: '/20191122/cda-graphics-v2.real.de.json', title: 'cda-graphics-v2.real.de.json' },
		// { uri: '/20191122/cda-graphics-v2.real.en.json', title: 'cda-graphics-v2.real.en.json' },
		{ uri: '/20191122/cda-graphics-v2.virtual.de.json', title: 'cda-graphics-v2.virtual.de.json' },
		// { uri: '/20191122/cda-graphics-v2.virtual.en.json', title: 'cda-graphics-v2.virtual.en.json' },
		// { uri: '/20191122/cda-literaturereferences-v2.json', title: 'cda-literaturereferences-v2.json' },
		{ uri: '/20200110/cda-paintings-v2.de.json', title: 'cda-paintings-v2.de.json' },
		// { uri: '/20200110/cda-paintings-v2.en.json', title: 'cda-paintings-v2.en.json'' },
		{ uri: '/20191122/cda-archivals-v2.de.json', title: 'cda-archivals-v2.de.json' },
		// { uri: '/20191122/cda-archivals-v2.en.json', title: 'cda-archivals-v2.en.json' },
	],
	port: 3000,
	eventTypes: [
		'cranachElder',
		'cranachYounger',
		'luther',
		'history',
	],
};
