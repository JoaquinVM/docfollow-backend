const Materia = require('../models/materia');

const controller = {

    createMateria: function (req, res) {
        let materia = new Materia(Object.assign(req.body));

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
    },

    getMateriasJefeCarrera: function (req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        Materia.find({id_jefe_carrera: jefeCarreraId}).exec((err, materias) => {
            if(err) return res.status(500).send({
                message: 'Error al obtener las materias'
            });

            if(!materias) return res.status(404).send({
                message: 'No se ha podido obtener las materias'
            });

            return res.status(200).send(materias);
        });
    }
};

module.exports = controller;
