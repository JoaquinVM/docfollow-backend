const express = require('express');
const PendienteController = require('../controllers/pendiente');

const router = express.Router();

router.get('/pendientes/:id_usuario', PendienteController.getPendientes);


module.exports = router;
