const DocenteController = require('../models/docente.model');
const Materia = require('../models/materia.model');
const utils = require('../utils');
const default_response = utils.default_response;
const response = utils.response;

async function calcMaterias(req, res, docenteId) {
    let materias_asignadas = 0;
    let horas_cubiertas = 0;
    Materia.find({id_docente: docenteId}).exec(response(req, res, (req, res, materias) => {
        materias.forEach(materia => {
            materias_asignadas += 1;
            horas_cubiertas += materia.horas_plantas;
        });
        let update = {
            materias_asignadas: materias_asignadas,
            horas_cubiertas: horas_cubiertas
        };
        console.log(update);
        DocenteController.findByIdAndUpdate(docenteId, update, {new: true}, response(req, res, (req, res, docente) => {

        }));
    }));
}

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
        Materia.updateMany({id_docente: docenteId}, {"$set": {id_docente: "", horas_planta: 0}}, response(req, res,
            (req, res, materias) => {
                DocenteController.findByIdAndDelete(docenteId, default_response(req, res));
        }));
    }
};

module.exports = controller;
