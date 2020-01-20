const DocenteController = require('../models/docente.model');
const Materia = require('../models/materia.model');
const utils = require('../utils');
const default_response = utils.default_response;
const response = utils.response;

const controller = {

    createDocente: function (req, res) {
        let docente = new DocenteController(Object.assign(req.body));
        docente.save(default_response(req, res));
    },

    getDocente: function(req, res){
        let docenteID = req.params.id;
        DocenteController.findById(docenteID, default_response(req, res));
    },

    getDocentes : function (req, res) {
        DocenteController.find({}).exec(default_response(req, res));
    },

    updateDocente: function(req, res){
        let docenteId = req.params.id;
        let update = req.body;

        DocenteController.findByIdAndUpdate(docenteId, update, {new: true}, default_response(req, res));
    },

    deleteDocente: function(req, res){
        let docenteId = req.params.id;

        DocenteController.findByIdAndDelete(docenteId, response(req, res, (req, res, docente) => {
            Materia.find({id_docente: docente._id}).exec(response(req, res, (req, res, materias) => {
                    materias.forEach(materia => {
                        let update = { id_docente: "", horas_planta: 0 };
                        Materia.findByIdAndUpdate(materia._id, update, {new: true}, default_response(req, res));
                    });
                })
            );

            return res.status(200).send(docente);
        }));
    }
};

module.exports = controller;
