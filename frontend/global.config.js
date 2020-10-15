module.exports = {
	dataBaseUrl: process.env.BACKEND_URL || 'http://localhost:3000/',
	resources: ['paintings', 'graphics', 'archivals'],
	colors: {
		painting: '#c24749',
		graphic: '#ffcc00',
		archival: '#6b7ea8',
	},
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
	placeholderImageUrl: 'https://via.placeholder.com/350',
	defaultDates: {
		start: 1500,
		end: 1600,
	},
};
