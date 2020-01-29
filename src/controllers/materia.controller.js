const MateriaController = require('../models/materia.model');
const Docente = require('../models/docente.model');
const utils = require('../utils');
const default_response = utils.default_response;
const response = utils.response;

function actualizarHoras(req, res, docenteId, materia, sumar, callback){
    if(!docenteId) return callback();
    Docente.findById(docenteId, response(req, res, (req, res, docente) => {
        let coef = sumar? 1 : -1;
        let nuevas_horas = docente.horas_cubiertas + (coef * materia.horas_planta);
        if(nuevas_horas > docente.horas_planta){
            return res.status(500).send({message: 'Las horas cubiertas no pueden sobrepasar las horas totales de planta'})
        }
        Docente.findByIdAndUpdate(docenteId,{
            materias_asignadas: docente.materias_asignadas + coef,
            horas_cubiertas: docente.horas_cubiertas + (coef + materia.horas_planta)
        },  {new: true}, response(req, res, (req, res, d) => {
            callback();
        }));
    }));
}

const controller = {

    createMateria: function (req, res) {
        let materia = new MateriaController(Object.assign(req.body));
        sumarHoras(req, res, materia.id_docente, materia, true, () => {
            materia.save(default_response(req, res));
        });
    },

    createMateriasExcel: async function (req, res) {
        let cols = ['Materia', 'Docente', 'Aula', 'Fecha Inicio', 'Fecha Fin', 'Créditos', 'Creador'];
        let excelCols = req.body.excel[3];
        if(!cols.every(val => excelCols.indexOf(val) >= 0)){
            return res.status(500).send({message: 'El archivo excel no tiene el formato correcto'})
        }
        let index = (array, key) => array[excelCols.indexOf(key)];
        let nombreIndex = excelCols.indexOf('Materia');
        let docenteIndex = excelCols.indexOf('Docente');
        let inicioIndex = excelCols.indexOf('Fecha Inicio');
        let finIndex = excelCols.indexOf('Fecha Fin');
        let aulaIndex = excelCols.indexOf('Aula');
        let creditosIndex = excelCols.indexOf('Créditos');
        let creadorIndex = excelCols.indexOf('Creador');

        let materias = req.body.excel.slice(5).map(materia => {
            return  {
                nombre: (materia[nombreIndex]).trim(),
                id_docente: (materia[docenteIndex]).trim().replace(/\s/g,''),
                inicio: materia[inicioIndex],
                fin: materia[finIndex],
                aula: materia[aulaIndex],
                horas_totales: materia[creditosIndex]*16,
                id_jefe_carrera: materia[creadorIndex]
            }
        });

        Docente.find({}).exec(response(req, res, (req, res, docentes) => {
            let nombres = {};
            docentes.forEach(docente => {
                let nombre = docente.apellido_paterno + docente.apellido_materno  + docente.nombre;
                if(docente.segundo_nombre) nombre += docente.segundo_nombre;
                nombres[nombre] = docente.id;
            });
            let materiasValidas = [];
            let errors = [];
            let i = 0;
            materias.forEach(materia => {
                i++;
                let nombreDocente = materia.id_docente;
                if(nombreDocente in nombres){
                    materia['id_docente'] = nombres[materia.id_docente];
                    materiasValidas.push(materia);
                }else{
                    errors.push(`Error en linea ${i+6}, ${materia.nombre}. Docente:  ${nombreDocente}, no registrado en base de datos`);
                }
            });
            MateriaController.create(materiasValidas, response(req, res, (req, res, materias) => {
                return res.status(200).send({materias_insertadas:materias, materias_no_insertadas: errors})
            }))
        }));
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

        actualizarHoras(req, res, materia.id_docente, materia, true, () => {
            actualizarHoras(req, res, req.params.docente_antiguo_id, materia, false, () => {
                MateriaController.findByIdAndUpdate(materiaId, update, {new: true}, default_response(req, res));
            });
        });
    },

    deleteMateria: function(req, res){
        let materiaId = req.params.id;

        actualizarHoras(req, res, req.params.docente_antiguo_id, materia, false, () => {
            MateriaController.findByIdAndDelete(materiaId, default_response(req, res));
        });

    },

    getMateriasJefeCarrera: function (req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        MateriaController.find({id_jefe_carrera: jefeCarreraId}).exec(default_response(req, res));
    },

    getMateriasSemestre: function(req, res){
        let anio = req.params.anio;
        let semestre = req.params.semestre;
        let s = new Date(anio + (semestre === '1'? '-02-01' : '-08-01'));
        let e = new Date((semestre === '1'? anio + '-07-31' : (parseInt(anio) + 1) + '-01-31'));

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
        let s = new Date(anio + (semestre === '1'? '-02-01' : '-08-01'));
        let e = new Date((semestre === '1'? anio + '-07-31' : (parseInt(anio) + 1) + '-01-31'));
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
