const Usuario = require('../models/usuario.model');
const Materia = require('../models/materia.model');
const roles = require('../roles');
const utils = require('../utils');
const response = utils.response;

function deberiaMostrarse(usuario, materia, data){

    let typeValidation =   (data.type === "start" && difDays(materia.inicio) >= data.days) ||
            (data.type === "end" && difDays(materia.fin) >=  data.days) ||
            (data.type === "dependency" && materia[data.dependency]);

    let contratoValidation = (materia.horas_planta >= materia.horas_totales)? !data.horas_contrato : true;

    let preferenciaValidation = usuario.preferencias[data.nombre];

    return typeValidation && contratoValidation && preferenciaValidation;x
}

function difDays(date){
    return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function generarPendientes(usuario, materia, atributos_materia){
    let pendientes = [];
    atributos_materia.forEach(data => {
        if (data.nombre in materia && materia[data.nombre] === false && deberiaMostrarse(usuario, materia, data))
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
            let findData = (usuario.role === 'jefe_carrera') ? {id_jefe_carrera: usuario.nombre_corto} : {};
            if(!usuario.ver_pendientes_pasadas){
                let semester = utils.getSemestre();
                findData['$and'] = [
                    { inicio: { $gte: semester.start} },
                    { fin: {$lte: semester.end}}
                ]
            }
            Materia.find(findData).exec(response(req, res, (req, res, materias) => {
                let pendientes = [];
                materias.forEach(materia =>
                    pendientes = pendientes.concat(generarPendientes(usuario, materia, roles[usuario.rol])));
                return res.status(200).send(pendientes);
            }));
        }));
    },

    generateEmail: function(req, res) {
        let pms = req.params;
        utils.sendMail(pms.destino, pms.materia, pms.inicio, pms.fin, pms.correo_id, info=>{
            res.send(info);
        }).catch(err => {
                console.log(error);
                return res.status(500).send({message: 'Ocurrio un error al enviar el email'});
        });
    }
};

module.exports = controller;
