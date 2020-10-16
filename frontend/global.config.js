module.exports = {
	dataBaseUrl: process.env.BACKEND_URL || 'http://localhost:3000/',
	resources: ['paintings', 'graphics', 'archivals'],
	colors: {
		painting: 'rgb(66,116,173)',
		graphic: 'rgb(72,138,63)',
		archival: 'rgb(226,161,74)',
	},
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
	placeholderImageUrl: 'https://secureavi.com/wp-content/uploads/2020/09/SecureAvi-NoImage.png',
	defaultDates: {
		start: 1500,
		end: 1600,
	},
};
