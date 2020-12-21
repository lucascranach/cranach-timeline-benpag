module.exports = {
	dataBaseUrl: process.env.VUE_APP_BACKEND_URL,
	resources: ['paintings', 'graphics', 'archivals'],
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
	defaultDates: {
		start: 1490,
		end: 1590,
	},
};
