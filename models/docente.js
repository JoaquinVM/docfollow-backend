const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocenteSchema = Schema({
    nombre: String,
    segundo_nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    materias_asignadas: Number,
    horas_planta: Number,
    horas_cubiertas:Number
});

module.exports = mongoose.model('Docente', DocenteSchema);
