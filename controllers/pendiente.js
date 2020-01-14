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
                        let type = data.type;

                        if(materia[atributo] === false){
                            let now = new Date().getTime();
                            let difInicio = Math.floor((now - materia.inicio.getTime()) / (1000 * 60 * 60 * 24));
                            let difFinal = Math.floor((now - materia.fin.getTime()) / (1000 * 60 * 60 * 24));
                            if(
                                (type === "start" && difInicio >= data.days) ||
                                (type === "end" && difFinal >=  data.days) ||
                                (type === "dependency" && !materia[data.dependency])

                            ){
                                let pendiente = {
                                    materia: materia.nombre,
                                    id_docente: materia.id_docente,
                                    inicio: materia.inicio,
                                    fin: materia.fin,
                                    message: data.message
                                };
                                pendientes.push(pendiente);
                            }
                        }
                    }
                });
                return res.status(200).send(pendientes);
            });


        });

    }
};

module.exports = controller;
