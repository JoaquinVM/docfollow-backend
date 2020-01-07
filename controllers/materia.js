const Materia = require('../models/materia');

const controller = {

    createMateria: function (req, res) {
        let materia = new Materia();
        let params = req.body;
        materia.nombre = params.nombre;
        materia.id_docente = params.id_docente;
        materia.inicio = new Date(params.inicio);
        materia.fin = new Date(params.fin);
        materia.silabo_subido = params.silabo_subido;
        materia.aula_revisada = params.aula_revisada;
        materia.examen_revisado = params.examen_revisado;
        materia.contrato_impreso = params.contrato_impreso;
        materia.contrato_firmado = params.contrato_firmado;
        materia.planilla_firmada = params.planilla_firmada;
        materia.cheque_solicitado = params.cheque_solicitado;
        materia.cheque_recibido = params.cheque_recibido;
        materia.cheque_entregado = params.cheque_entregado;
        materia.horas_totales = params.horas_totales;
        materia.horas_planta = params.horas_planta;

        materia.save((err, materia) => {
            if(err) return res.status(500).send({
                message: 'Error al crear la materia'
            });
            if(!materia) return res.status(404).send({
                message: 'No se ha podido crear la materia'
            });
            return res.status(200).send(materia);
        });
    },

    getMateria: function(req, res){
        let materiaID = req.params.id;

        Materia.findById(materiaID, (err, materia) => {
            if(err) return res.status(500).send({
                message: 'Error al obtener la materia'
            });
            if(!materia) return res.status(404).send({
                message: 'No se ha podido obtener la materia'
            });
            return res.status(200).send(materia);
        });
    },

    getMaterias : function (req, res) {
        Materia.find({}).exec((err, materias) => {
            if(err) return res.status(500).send({
                message: 'Error al obtener las materias'
            });

            if(!materias) return res.status(404).send({
                message: 'No se ha podido obtener las materias'
            });

            return res.status(200).send(materias);
        });
    },

    updateMateria: function(req, res){
        let materiaId = req.params.id;
        let update = req.body;

        Materia.findByIdAndUpdate(materiaId, update, {new: true},(err, materia) => {
            if(err) return res.status(500).send({
                message: 'Error al actualizar la materia'
            });
            if(!materia) return res.status(404).send({
                message: 'No se ha podido actualizar la materia'
            });

            return res.status(200).send(materia);
        });
    },

    deleteMateria: function(req, res){
        let materiaId = req.params.id;

        Materia.findByIdAndDelete(materiaId, (err, materia) => {
            if(err) return res.status(500).send({
                message: 'Error al eliminar la materia'
            });
            if(!materia) return res.status(404).send({
                message: 'No se ha podido eliminar la materia'
            });
            return res.status(200).send(materia);
        })
    }
};

module.exports = controller;
