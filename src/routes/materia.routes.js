const express = require('express');
const MateriaController = require('../controllers/materia.controller');

const router = express.Router();

router.post('/create', MateriaController.createMateria);
router.get('/getAll', MateriaController.getMaterias);
router.get('/getOne/:id', MateriaController.getMateria);
router.get('/getByUserId/:id_jefe_carrera', MateriaController.getMateriasJefeCarrera);
router.put('/update/:id', MateriaController.updateMateria);
router.delete('/delete/:id', MateriaController.deleteMateria);



module.exports = router;
