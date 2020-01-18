const express = require('express');
const DocenteController = require('../controllers/docente.controller');

const router = express.Router();

router.post('/create', DocenteController.createDocente);
router.get('/getAll', DocenteController.getDocentes);
router.get('/getOne/:id', DocenteController.getDocente);
router.put('/update/:id', DocenteController.updateDocente);
router.delete('/delete/:id', DocenteController.deleteDocente);


module.exports = router;
