const express = require('express');
const cors = require('cors');
const path = require('path');

const config = require('./global.config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/data')));

console.log(path.join(__dirname, '/data'));

app.listen(config.port, () => {
	console.log(`Server listen on port ${config.port}`);
});

app.use((req, res) => {
	res.status(404);
	res.send({ error: 'Not found' });
});

// Declaring 'next' here is mandatory for an error handler, see: https://expressjs.com/de/guide/error-handling.html
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(500);
	res.send({ error: err.message });
});
