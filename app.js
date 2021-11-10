require('dotenv').config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./app/routes');

const app = express();

app.use(cors());
app.use(morgan('combined'));

const port = process.env.PORT || process.env.API_PORT || 3001;

app.use('/', routes);

app.listen(port);

module.exports = app;
