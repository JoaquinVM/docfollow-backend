const Usuario = require('../models/usuario.model');
const Materia = require('../models/materia.model');
const roles = require('../roles');
const response = require('../utils').response;

function procesarTipo(type, materia, data){
    return  (type === "start" && difDays(materia.inicio) >= data.days) ||
            (type === "end" && difDays(materia.fin) >=  data.days) ||
            (type === "dependency" && materia[data.dependency]);
}

function difDays(date){
    return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function generarPendientes(materia, atributos_materia){
    let pendientes = [];
    atributos_materia.forEach(data => {
        if (data.nombre in materia && materia[data.nombre] === false && procesarTipo(data.type, materia, data))
            pendientes.push({
                materia: materia.nombre,
                id_docente: materia.id_docente,
                inicio: materia.inicio,
                fin: materia.fin,
                message: data.message
            });
    });
    return pendientes;
}

const controller = {
    getPendientes: function(req, res){
        let usuarioId =  req.params.id_usuario;

        Usuario.findById(usuarioId, response(req, res, (req, res, usuario) => {
            let findData = (usuario.role === 'jefe_carrera') ? {id_jefe_carrera: usuarioId} : {};
            Materia.find(findData).exec(response(req, res, (req, res, materias) => {
                let pendientes = [];
                materias.forEach(materia =>
                    pendientes = pendientes.concat(generarPendientes(materia, roles[usuario.rol])));
                return res.status(200).send(pendientes);
            }));
        }));
    }
};

module.exports = controller;
