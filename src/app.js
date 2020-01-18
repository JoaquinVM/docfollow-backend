const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const materia_routes = require('./routes/materia.routes');
const docente_routes = require('./routes/decente.routes');
const usuario_routes = require('./routes/usuario.routes');
const pendiente_routes = require('./routes/pendiente.routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/materias', materia_routes);
app.use('/docentes', docente_routes);
app.use('/usuarios', usuario_routes);
app.use('/pendientes', pendiente_routes);


module.exports = app;
