function getFormattedBranchName(branchName) {
	const re = /[#$+*!\\()[\]{}?"']/i;
	return branchName.replace('/', '-').replace(re, '').toLowerCase();
}

function getBackendURL() {
	if (process.env.VUE_APP_BRANCH_NAME) {
		return process.env.VUE_APP_BACKEND_HOST
			+ getFormattedBranchName(process.env.VUE_APP_BRANCH_NAME)
			+ process.env.VUE_APP_BACKEND_PATH;
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
