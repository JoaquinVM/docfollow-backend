const Usuario = require('../models/usuario');

const controller = {

    createUsuario: function (req, res) {
        let usuario = new Usuario(Object.assign(req.body));

        usuario.save((err, usuario) => {
            if(err) return res.status(500).send({
                message: 'Error al crear el usuario',
                err: err
            });
            if(!usuario) return res.status(404).send({
                message: 'No se ha podido crear el usuario'
            });
            return res.status(200).send(usuario);
        });
    },

    getUsuario: function(req, res){
        let usuarioID = req.params.id;

        Usuario.findById(usuarioID, (err, usuario) => {
            if(err) return res.status(500).send({
                message: 'Error al obtener el usuario'
            });
            if(!usuario) return res.status(404).send({
                message: 'No se ha podido obtener el usuario'
            });
            return res.status(200).send(usuario);
        });
    },

    getUsuarios : function (req, res) {
        Usuario.find({}).exec((err, usuarios) => {
            if(err) return res.status(500).send({
                message: 'Error al obtener las usuarios'
            });

            if(!usuarios) return res.status(404).send({
                message: 'No se ha podido obtener las usuarios'
            });

            return res.status(200).send(usuarios);
        });
    },

    updateUsuario: function(req, res){
        let usuarioId = req.params.id;
        let update = req.body;

        Usuario.findByIdAndUpdate(usuarioId, update, {new: true},(err, usuario) => {
            if(err) return res.status(500).send({
                message: 'Error al actualizar el usuario'
            });
            if(!usuario) return res.status(404).send({
                message: 'No se ha podido actualizar el usuario'
            });

            return res.status(200).send(usuario);
        });
    },

    deleteUsuario: function(req, res){
        let usuarioId = req.params.id;

        Usuario.findByIdAndDelete(usuarioId, (err, usuario) => {
            if(err) return res.status(500).send({
                message: 'Error al eliminar el usuario'
            });
            if(!usuario) return res.status(404).send({
                message: 'No se ha podido eliminar el usuario'
            });
            return res.status(200).send(usuario);
        })
    }
};

module.exports = controller;
