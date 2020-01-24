const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferenciaMateriaSchema = new Schema({
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
    horas_totales: Boolean,
    horas_planta: Boolean
});

const UsuarioSchema = Schema({
    nombre: String,
    segundo_nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    ci: Number,
    rol: String,
    super_usuario: Boolean,
    preferencias_pendientes: PreferenciaMateriaSchema,
    preferencias_seguimiento: PreferenciaMateriaSchema,
    preferencias_materias: PreferenciaMateriaSchema,
    preferencias_docente: new Schema({
        email: Boolean,
        materias_asignadas: Boolean,
        horas_planta: Boolean,
        horas_cubiertas:Boolean,
        evaluacion_pares: Boolean
    })
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
