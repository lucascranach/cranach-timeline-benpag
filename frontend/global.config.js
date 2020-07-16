module.exports = {
	dataBaseUrl: process.env.BACKEND_URL || 'http://localhost:3000/',
	resources: ['paintings', 'graphics', 'archivals'],
	colors: {
		paintings: 'rgb(66,116,173)',
		graphics: 'rgb(72,138,63)',
		archivals: 'rgb(226,161,74)',
	},
};
