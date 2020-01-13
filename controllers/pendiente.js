const moment = require('moment');
const Usuario = require('../models/usuario');
const Materia = require('../models/materia');
const roles = require('../roles');

const controller = {
    getPendientes: function(req, res){
        let usuarioId =  req.params.id_usuario;

        Usuario.findById(usuarioId, (err, usuario) => {
            if(err) return res.status(500).send({ message: 'Error al obtener usuario' });
            if(!usuario) return res.status(404).send({ message: 'No se ha podido obtener el usuario' });
            let findData = (usuario.role === 'jefe_carrera') ? {id_jefe_carrera: jefeCarreraId}:{};
            Materia.find(findData).exec((err, materias) => {
                if(err) return res.status(500).send({
                    message: 'Error al obtener las materias'
                });

                if(!materias) return res.status(404).send({
                    message: 'No se ha podido obtener las materias'
                });

                let pendientes = [];

                materias.forEach(materia => {
                    let atributos = roles[usuario.rol];
                    for(let atributo in atributos){
                        let data = atributos[atributo];
                        //let type = data.type;
                        let pendiente = {
                            materia: materia.nombre,
                            id_docente: materia.id_docente,
                            inicio: materia.inicio,
                            fin: materia.fin,
                            message: data.message
                        };
                        pendientes.push(pendiente);
                    }
                });
                return res.status(200).send(pendientes);
            });


        });

    }
};

module.exports = controller;
