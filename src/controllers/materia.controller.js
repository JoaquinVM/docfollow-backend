const MateriaController = require('../models/materia.model');
const Docente = require('../models/docente.model');
const utils = require('../utils');
const default_response = utils.default_response;
const response = utils.response();

const controller = {

    createMateria: function (req, res) {
        let materia = new MateriaController(Object.assign(req.body));
        materia.save(default_response(req, res));
    },

    getMateria: function(req, res){
        let materiaID = req.params.id;
        MateriaController.findById(materiaID, default_response(req, res));
    },

    getMaterias : function (req, res) {
        MateriaController.find({}).exec(default_response(req, res));
    },

    updateMateria: function(req, res){
        let materiaId = req.params.id;
        let update = req.body;
        MateriaController.findByIdAndUpdate(materiaId, update, {new: true}, default_response(req, res));

    },

    deleteMateria: function(req, res){
        let materiaId = req.params.id;
        MateriaController.findByIdAndDelete(materiaId, response(req, res , (req, res, materia) => {
           if(materia.id_docente){
               Docente.findById(materia.id_docente, response(req, res, (req, res, docente) => {
                   let new_horas = docente.horas_cubiertas - materia.horas_planta;
                   Docente.findByIdAndUpdate(materia.id_docente, {horas_cubiertas: new_horas}, {new: true}, response(req, res, (req, res, doc) => {
                       return res.status(200).send(materia);
                   }))
               }));
           }
        }));
    },

    getMateriasJefeCarrera: function (req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        MateriaController.find({id_jefe_carrera: jefeCarreraId}).exec(default_response(req, res));
    }
};

module.exports = controller;
