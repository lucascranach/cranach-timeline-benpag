const express = require('express');
const path = require('path');
const cors = require('cors');

const config = require('./global.config');
const indexRouter = require('./routes/index');
const paintingsRouter = require('./routes/paintings');
const graphicsRouter = require('./routes/graphics');
const archivalsRouter = require('./routes/archivals');
const eventsRouter = require('./routes/events');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/paintings', paintingsRouter);
app.use('/graphics', graphicsRouter);
app.use('/archivals', archivalsRouter);
app.use('/events', eventsRouter);

app.listen(config.port, () => {
	console.log(`Server listen on port ${config.port}`);
});

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
	res.status(404);

	if (req.is('application/json')) {
		res.send({ error: 'Not found' });
		return;
	}

	res.status(415);
	res.send(`Unsupported Media Type: ${req.accepts}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(500);

	if (req.is('application/json')) {
		res.send({ error: err.message });
		return;
	}

	res.status(406).send('Not Acceptable');
});
