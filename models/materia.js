const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = Schema({
    nombre: String,
    id_docente: String,
    id_jefe_carrera: String,
    inicio: Date,
    fin: Date,
    silabo_subido: Boolean,
    aula_revisada: Boolean,
    examen_revisado: Boolean,
    contrato_impreso: Boolean,
    contrato_firmado: Boolean,
    planilla_lista: Boolean,
    planilla_firmada: Boolean,
    cheque_solicitado: Boolean,
    cheque_recibido: Boolean,
    cheque_entregado: Boolean,
    horas_totales: Number,
    horas_planta: Number
});

module.exports = mongoose.model('Materia', MateriaSchema);

