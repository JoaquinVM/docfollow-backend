const MateriaController = require('../models/materia.model');
const Docente = require('../models/docente.model');
const utils = require('../utils');
const default_response = utils.default_response;
const response = utils.response;

const controller = {

    createMateria: function (req, res) {
        let materia = new MateriaController(Object.assign(req.body));
        materia.save(default_response(req, res));
    },

    createMateriasExcel: function (req, res) {
        console.log('hola');
        console.log(Object.values(req.body.excel)[6]);
        return res.status(200).send({m: 'ffef'})
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
        MateriaController.findByIdAndDelete(materiaId, default_response(req, res));
    },

    getMateriasJefeCarrera: function (req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        MateriaController.find({id_jefe_carrera: jefeCarreraId}).exec(default_response(req, res));
    },

    getMateriasSemestre: function(req, res){
        let anio = req.params.anio;
        let semestre = req.params.semestre;
        console.log(typeof semestre);
        let s = new Date(anio + (semestre === '1'? '-02-01' : '-08-01'));
        let e = new Date((semestre === '1'? anio + '-07-31' : (parseInt(anio) + 1) + '-01-31'));
        console.log(s);
        console.log(e);

        MateriaController.find({
            $and: [
                { inicio: { $gte: s} },
                { fin: {$lte: e}}
            ]
        }).exec(default_response(req, res));
    },

    getMateriasSemestreJefeCarrera: function(req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        let anio = req.params.anio;
        let semestre = req.params.semestre;
        console.log(typeof semestre);
        let s = new Date(anio + (semestre === '1'? '-02-01' : '-08-01'));
        let e = new Date((semestre === '1'? anio + '-07-31' : (parseInt(anio) + 1) + '-01-31'));
        console.log(s);
        console.log(e);

        MateriaController.find({
            $and: [
                { inicio: { $gte: s} },
                { fin: {$lte: e}},
                { id_jefe_carrera: jefeCarreraId }
            ]
        }).exec(default_response(req, res));
    }
};

module.exports = controller;
