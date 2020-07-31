const express = require('express');
const path = require('path');

const config = require('./global.config');
const indexRouter = require('./routes/index');
const paintingsRouter = require('./routes/paintings');
const loggingRouter = require('./routes/log');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/paintings', paintingsRouter);
app.use('/log', loggingRouter);

app.listen(config.port, () => {
	console.log(`Server listen on port ${config.port}`);
});
