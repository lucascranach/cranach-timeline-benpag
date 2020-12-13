const express = require('express');
const cors = require('cors');

const indexRouter = require('./routes/index');
const paintingsRouter = require('./routes/paintings');
const loggingRouter = require('./routes/log');
const graphicsRouter = require('./routes/graphics');
const archivalsRouter = require('./routes/archivals');
const eventsRouter = require('./routes/events');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/paintings', paintingsRouter);
app.use('/log', loggingRouter);
app.use('/graphics', graphicsRouter);
app.use('/archivals', archivalsRouter);
app.use('/events', eventsRouter);

app.use((req, res) => {
	res.status(404);

	if (req.get('Content-Type') === 'application/json') {
		res.send({ error: 'Not found' });
		return;
	}

	res.status(406).send('Not Acceptable');
});

// Declaring 'next' here is mandatory for an error handler, see: https://expressjs.com/de/guide/error-handling.html
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(500);

	if (req.get('Content-Type') === 'application/json') {
		res.send({ error: err.message });
		return;
	}

	res.status(406).send('Not Acceptable');
});

module.exports = app;
