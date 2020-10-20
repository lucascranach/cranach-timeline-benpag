module.exports = {
	dataBaseUrl: process.env.BACKEND_URL || 'http://localhost:3000/',
	resources: ['paintings', 'graphics', 'archivals'],
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
	defaultDates: {
		start: 1490,
		end: 1590,
	},
};
