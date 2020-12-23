const AWS = require('aws-sdk');
const axios = require('axios');

const S3 = new AWS.S3({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	region: 'eu-central-1',
});

const HTTPOptions = {
	auth: {
		username: 'cranach-admin',
		password: '116aa8fd9cde1e48232c1e99051e4f504c',
	  },
};

async function deleteBucket(Bucket) {
	const listParams = {
		Bucket,
	};
	const listResponse = await S3.listObjectsV2(listParams).promise();
	const deleteObjects = listResponse.Contents.map((obj) => ({ Key: obj.Key }));
	const deleteParams = {
		Bucket,
		Delete: {
			Objects: deleteObjects,
		},
	};
	if (deleteObjects.length > 0) await S3.deleteObjects(deleteParams).promise();
	await S3.deleteBucket(listParams).promise();
}

async function deleteBuckets() {
	const response = await S3.listBuckets({}).promise();
	const buckets = response.Buckets.map((b) => b.Name);
	const promises = [];
	buckets.forEach((bucket) => {
		promises.push(deleteBucket(bucket));
	});
	await Promise.all(promises);
}

async function startJobs() {
	const jobResponse = await axios.get('https://dev.pagelsdorf.de/job/cranach/api/json?TOKEN=', HTTPOptions);
	const jobPromises = [];
	jobResponse.data.jobs.forEach((job) => {
		jobPromises.push(axios.get(`${job.url}api/json`, HTTPOptions));
	});
	const jobDetailResponse = await Promise.all(jobPromises);

	const buildPromises = [];
	const jobDetails = jobDetailResponse.map((jobDetail) => jobDetail.data.buildable);
	jobResponse.data.jobs.forEach((job, i) => {
		if (jobDetails[i]) {
			buildPromises.push(axios.post(`${job.url}build`, HTTPOptions));
		}
	});
	// const buildResponse = await Promise.all(buildPromises);
	// console.log(buildResponse.data);
}

async function main() {
	// await deleteBuckets();
	await startJobs();
}

console.log('Clear started');

main().then(() => {
	console.log('Clear finished');
});
