const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./global.config');
const indexRouter = require('./routes/index');
const paintingsRouter = require('./routes/paintings');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/paintings', paintingsRouter);

app.listen(config.port, () => {
  console.log(`Server listen on port ${config.port}`);
});
