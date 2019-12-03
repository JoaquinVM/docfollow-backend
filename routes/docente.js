const express = require('express');
const DocenteController = require('../controllers/docente');

const router = express.Router();

router.put('/docente', DocenteController.createDocente);
router.get('/docentes', DocenteController.getDocentes);
router.get('/docente/:id', DocenteController.getDocente);
router.post('/docente/:id', DocenteController.updateDocente);
router.delete('/docente/:id', DocenteController.deleteDocente);


module.exports = router;
