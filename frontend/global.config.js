module.exports = {
	dataBaseUrl: process.env.BACKEND_URL || 'http://localhost:3000/',
	resources: ['paintings', 'graphics', 'archivals'],
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
};
