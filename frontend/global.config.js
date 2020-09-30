module.exports = {
	dataBaseUrl: process.env.BACKEND_URL || 'http://localhost:3000/',
	resources: ['paintings', 'graphics', 'archivals'],
	colors: {
		paintings: 'rgb(66,116,173)',
		graphics: 'rgb(72,138,63)',
		archivals: 'rgb(226,161,74)',
	},
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
	placeholderImageUrl: 'https://via.placeholder.com/350',
	defaultDates: {
		start: 1500,
		end: 1600,
	},
};
