module.exports = {
	dataBaseUrl: process.env.BACKEND_URL || 'http://localhost:3000/',
	resources: ['paintings', 'graphics', 'archivals'],
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
	placeholderImageUrl: 'https://via.placeholder.com/350',
	defaultDates: {
		start: 1500,
		end: 1600,
	},
};
