function getBackendURL() {
	if (process.env.BRANCH_NAME) {
		return process.env.VUE_APP_BACKEND_URL_HOST + process.env.BRANCH_NAME.replace('/', '-') + process.env.VUE_APP_BACKEND_URL_PATH;
	}
	return process.env.VUE_APP_BACKEND_URL;
}

module.exports = {
	dataBaseUrl: getBackendURL(),
	resources: ['paintings', 'graphics', 'archivals'],
	events: ['cranachElder', 'cranachYounger', 'luther', 'history'],
	defaultDates: {
		start: 1490,
		end: 1590,
	},
};
