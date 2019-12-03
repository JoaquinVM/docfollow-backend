const express = require('express');
const MateriaController = require('../controllers/materia');

const router = express.Router();

router.put('/materia', MateriaController.createMateria);
router.get('/materias', MateriaController.getMaterias);
router.get('/materia/:id', MateriaController.getMateria);
router.post('/materia/:id', MateriaController.updateMateria);
router.delete('/materia/:id', MateriaController.deleteMateria);


module.exports = router;
