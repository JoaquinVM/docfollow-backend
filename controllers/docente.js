const Docente = require('../models/docente');

const controller = {

    createDocente: function (req, res) {
        let docente = new Docente(Object.assign(req.body));

        docente.save((err, docente) => {
            if(err) return res.status(500).send({
                message: 'Error al crear el docente'
            });
            if(!docente) return res.status(404).send({
                message: 'No se ha podido crear el docente'
            });
            return res.status(200).send(docente);
        });
    },

    getDocente: function(req, res){
        let docenteID = req.params.id;

        Docente.findById(docenteID, (err, docente) => {
            if(err) return res.status(500).send({
                message: 'Error al obtener el docente'
            });
            if(!docente) return res.status(404).send({
                message: 'No se ha podido obtener el docente'
            });
            return res.status(200).send(docente);
        });
    },

    getDocentes : function (req, res) {
        Docente.find({}).exec((err, docentes) => {
            if(err) return res.status(500).send({
                message: 'Error al obtener los docentes'
            });

            if(!docentes) return res.status(404).send({
                message: 'No se ha podido obtener los docentes'
            });

            return res.status(200).send(docentes);
        });
    },

    updateDocente: function(req, res){
        let docenteId = req.params.id;
        let update = req.body;

        Docente.findByIdAndUpdate(docenteId, update, {new: true},(err, docente) => {
            if(err) return res.status(500).send({
                message: 'Error al actualizar el docente'
            });
            if(!docente) return res.status(404).send({
                message: 'No se ha podido actualizar el docente'
            });

            return res.status(200).send(docente);
        });
    },

    deleteDocente: function(req, res){
        let docenteId = req.params.id;

        Docente.findByIdAndDelete(docenteId, (err, docente) => {
            if(err) return res.status(500).send({
                message: 'Error al eliminar el docente'
            });
            if(!docente) return res.status(404).send({
                message: 'No se ha podido eliminar el docente'
            });
            return res.status(200).send(docente);
        })
    }
};

module.exports = controller;
