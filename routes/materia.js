const express = require('express');
const MateriaController = require('../controllers/materia');

const router = express.Router();

router.post('/materias', MateriaController.createMateria);
router.get('/materias', MateriaController.getMaterias);
router.get('/materia/:id', MateriaController.getMateria);
router.put('/materia/:id', MateriaController.updateMateria);
router.delete('/materia/:id', MateriaController.deleteMateria);


module.exports = router;
