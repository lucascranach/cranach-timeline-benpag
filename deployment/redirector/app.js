const express = require('express');
const axios = require('axios');

const app = express();

app.use('/asset', express.static(__dirname));

const HTTPOptions = {
	auth: {
		username: process.env.JENKINS_REMOTE_USERNAME,
		password: process.env.JENKINS_REMOTE_PASSWORD,
	},
};

app.listen(3000, () => {
	console.log('Server listen on port 3000');
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/data', async (req, res) => {
    try {
      const stages = await getStages();
      res.send(stages);
    } catch (ex){
      console.log(ex);
    }
});

async function getStages() {
    const response = await axios.get(`${process.env.JENKINS_URL}job/cranach/api/json`, HTTPOptions);
    const promises = [];
    response.data.jobs.forEach((job) => {
        const url = job.url;
        promises.push(isBuildable(`${url}api/json`));
    });
    const allStages = await Promise.all(promises);
    return allStages.filter((stage) => stage.buildable);
}

async function isBuildable(url) {
    const response = await axios.get(url, HTTPOptions);
    const stageUrl = `http://cranach-${getFormattedBranchName(response.data.displayName)}.s3-website.eu-central-1.amazonaws.com`;
    return {
        buildable: response.data.buildable,
        name: response.data.displayName,
        url: stageUrl
    };
}

function getFormattedBranchName(branchName) {
    const re = /[#$+*!\\()\[\]{}?"']/i;
    return branchName.replace('/', '-').replace(re, '').toLowerCase()
}

