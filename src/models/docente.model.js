const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Materia = require('../models/materia.model');

const DocenteSchema = Schema({
    nombre: String,
    segundo_nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    email: String,
    materias_asignadas: Number,
    horas_planta: Number,
    horas_cubiertas: Number,
    evaluacion_pares: Boolean
});

DocenteSchema.pre('find', function (next) {
    let materias_asignadas = 0;
    let horas_cubiertas = 0;
    Materia.find({id_docente: this._id}).exec((err, materias) => {
        materias.forEach(materia => {
            materias_asignadas += 1;
            horas_cubiertas += materia.horas_planta;
        });
        let update = {
            materias_asignadas: materias_asignadas,
            horas_cubiertas: horas_cubiertas
        };
        this.model.findByIdAndUpdate(this._id, update, {new: true}, (err, docente) => {
            if(err) next(err);
            next();
        });
    });
});

module.exports = mongoose.model('Docente', DocenteSchema);
