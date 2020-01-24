const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Materia = require('../models/materia.model');

const DocenteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    segundo_nombre: {
        type: String,
        default: ''
    },
    apellido_paterno: {
        type: String,
        required: true
    },
    apellido_materno: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: [true, 'Este email ya ha sido registrado'],
        required: [true, 'El  campo email es requerido']
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Se ha introducido un email no valido']
    },
    materias_asignadas: {
        type: Number,
        default: 0
    },
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
