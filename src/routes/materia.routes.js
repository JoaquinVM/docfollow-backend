const express = require('express');
const MateriaController = require('../controllers/materia.controller');
const TokenValidation = require('../verifyToken');

const router = express.Router();

router.post('/create', TokenValidation, MateriaController.createMateria);
router.get('/getAll', MateriaController.getMaterias);
router.get('/getOne/:id', TokenValidation, MateriaController.getMateria);
router.get('/getByUserId/:id_jefe_carrera', TokenValidation, MateriaController.getMateriasJefeCarrera);
router.put('/update/:id', MateriaController.updateMateria);
router.delete('/delete/:id', TokenValidation, MateriaController.deleteMateria);



module.exports = router;
