const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const materia_routes = require('./routes/materia');
const docente_routes = require('./routes/docente');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', materia_routes);
app.use('/api', docente_routes);

module.exports = app;
